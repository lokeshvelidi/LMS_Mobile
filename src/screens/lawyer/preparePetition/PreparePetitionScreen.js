import React, {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import PetitionCaseSelector from "../../../components/lawyer/preparePetition/PetitionCaseSelector";

import DraftingChecklist from "../../../components/lawyer/preparePetition/DraftingChecklist";

import AvailableDocuments from "../../../components/lawyer/preparePetition/AvailableDocuments";

import PetitionDraftWorkspace from "../../../components/lawyer/preparePetition/PetitionDraftWorkspace";
import { getApiErrorMessage } from "../../../services/api/authService";
import {
  downloadLawyerDocument,
  getLawyerCaseDocuments,
  getLawyerCases,
} from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
};

const PreparePetitionScreen = ({
  navigation,
  route,
}) => {
  const [cases, setCases] = useState([]);
  const initialCase = route?.params?.caseData ?? null;

  const [
    selectedCase,
    setSelectedCase,
  ] = useState(initialCase);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let active = true;
    getLawyerCases()
      .then((items) => {
        if (!active) return;
        setCases(items);
        setSelectedCase((current) => current ?? items[0] ?? null);
      })
      .catch((requestError) => Alert.alert("Cases unavailable", getApiErrorMessage(requestError)));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    getLawyerCaseDocuments(selectedCase?.id)
      .then((items) => active && setDocuments(items))
      .catch((requestError) => {
        if (active) {
          setDocuments([]);
          Alert.alert("Documents unavailable", getApiErrorMessage(requestError));
        }
      });
    return () => { active = false; };
  }, [selectedCase?.id]);

  const [
    checklist,
    setChecklist,
  ] = useState([
    {
      id: "facts",
      title: "Review case facts",
      description:
        "Review the available case information.",
      completed: true,
    },

    {
      id: "documents",
      title: "Review supporting documents",
      description:
        "Check all available documents.",
      completed: false,
    },

    {
      id: "relief",
      title: "Confirm relief sought",
      description:
        "Confirm the requested relief.",
      completed: false,
    },

    {
      id: "draft",
      title: "Prepare petition draft",
      description:
        "Complete the petition draft.",
      completed: false,
    },
  ]);

  const [
    facts,
    setFacts,
  ] = useState(
    ""
  );

  const [
    relief,
    setRelief,
  ] = useState("");

  const handleCaseSelect = (
    item
  ) => {
    setSelectedCase(item);

    setFacts("");

    setRelief("");
  };

  const handleChecklistToggle = (
    id
  ) => {
    setChecklist((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              completed:
                !item.completed,
            }
          : item
      )
    );
  };

  const handleDocumentPress = async (
    document
  ) => {
    try {
      const result = await downloadLawyerDocument(document.id);
      Alert.alert(document.name, `Downloaded temporarily to ${result.uri}`);
    } catch (requestError) {
      Alert.alert("Download failed", getApiErrorMessage(requestError));
    }
  };

  const handleSaveDraft = () => {
    Alert.alert(
      "Petition Draft",
      "The petition draft will be saved after API integration."
    );
  };

  const handleSubmit = () => {
    Alert.alert(
      "Submit Petition",
      "Petition submission will be connected after API integration."
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* Header */}

        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Prepare Petition
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Prepare and review petition
            drafts for your assigned cases.
          </AppText>
        </View>

        {/* Case Selector */}

        <PetitionCaseSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            handleCaseSelect
          }
        />

        {/* Selected Case Summary */}

        {selectedCase && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View
                style={styles.summaryContent}
              >
                <AppText
                  size="lg"
                  weight="bold"
                  style={styles.caseNumber}
                >
                  {selectedCase.caseNumber}
                </AppText>

                <AppText
                  size="sm"
                  color="textSecondary"
                  style={styles.client}
                >
                  {selectedCase.client}
                </AppText>
              </View>

              <View style={styles.typeBadge}>
                <AppText
                  size="xs"
                  weight="bold"
                  style={styles.typeText}
                >
                  {selectedCase.type}
                </AppText>
              </View>
            </View>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <AppText
                  size="xs"
                  weight="semiBold"
                  style={styles.label}
                >
                  COURT
                </AppText>

                <AppText
                  size="sm"
                  weight="semiBold"
                  style={styles.value}
                >
                  {selectedCase.court}
                </AppText>
              </View>

              <View style={styles.summaryItem}>
                <AppText
                  size="xs"
                  weight="semiBold"
                  style={styles.label}
                >
                  STAGE
                </AppText>

                <AppText
                  size="sm"
                  weight="semiBold"
                  style={styles.value}
                >
                  {selectedCase.stage}
                </AppText>
              </View>

              <View style={styles.summaryItem}>
                <AppText
                  size="xs"
                  weight="semiBold"
                  style={styles.label}
                >
                  NEXT HEARING
                </AppText>

                <AppText
                  size="sm"
                  weight="semiBold"
                  style={styles.value}
                >
                  {selectedCase.nextHearing}
                </AppText>
              </View>
            </View>
          </View>
        )}

        {/* Checklist */}

        <DraftingChecklist
          items={checklist}
          onToggle={
            handleChecklistToggle
          }
        />

        {/* Documents */}

        <AvailableDocuments
          documents={documents}
          onDocumentPress={
            handleDocumentPress
          }
        />

        {/* Workspace */}

        <PetitionDraftWorkspace
          facts={facts}
          setFacts={setFacts}
          relief={relief}
          setRelief={setRelief}
        />

        {/* Actions */}

        <View style={styles.actions}>
          <Pressable
            onPress={handleSaveDraft}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed &&
                styles.pressed,
            ]}
          >
            <AppText
              size="sm"
              weight="bold"
              style={styles.secondaryText}
            >
              Save Draft
            </AppText>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed &&
                styles.pressed,
            ]}
          >
            <AppText
              size="sm"
              weight="bold"
              style={styles.primaryText}
            >
              Submit Petition
            </AppText>
          </Pressable>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },

  summaryCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  summaryContent: {
    flex: 1,
    paddingRight: 10,
  },

  caseNumber: {
    color: COLORS.navy,
  },

  client: {
    marginTop: 4,
  },

  typeBadge: {
    backgroundColor: "#F7EAC5",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  typeText: {
    color: COLORS.navy,
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },

  summaryItem: {
    width: "50%",
    marginBottom: 15,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  value: {
    color: COLORS.navy,
    marginTop: 5,
    paddingRight: 10,
  },

  actions: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },

  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#FFFFFF",
  },

  secondaryText: {
    color: COLORS.navy,
  },

  pressed: {
    opacity: 0.7,
  },

  bottomSpace: {
    height: 25,
  },
});

export default PreparePetitionScreen;
