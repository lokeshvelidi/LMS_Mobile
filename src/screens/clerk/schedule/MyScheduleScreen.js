import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import ScheduleSummaryCard from '../../../components/clerk/schedule/ScheduleSummaryCard';

import ScheduleDayHeader from '../../../components/clerk/schedule/ScheduleDayHeader';

import ScheduleHearingCard from '../../../components/clerk/schedule/ScheduleHearingCard';
import {getClerkHearings} from '../../../services/api/clerkService';
import {SidebarMenuButton} from '../../../components/navigation/RoleSidebar';

const MyScheduleScreen = ({
  navigation,
}) => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const [selectedDay, setSelectedDay] =
    useState('All');
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    getClerkHearings().then((items) => setSchedule(items.map((item) => {
      const date = new Date(item.hearingDate);
      if (item.hearingId == null || Number.isNaN(date.getTime())) return null;
      return {
        id: item.hearingId,
        dateValue: date,
        day: date.toLocaleDateString('en-US', {weekday: 'long'}),
        date: date.toLocaleDateString('en-IN'),
        time: date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        caseNo: item.caseNumber,
        court: item.courtHall,
        type: item.purpose,
        status: item.status,
      };
    }).filter(Boolean))).catch(() => setSchedule([]));
  }, []);

  const [dayIndex, setDayIndex] =
    useState(0);

  const days = [
    'All',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  const filteredSchedule = useMemo(() => {
    if (selectedDay === 'All') {
      return schedule;
    }

    return schedule.filter(
      item => item.day === selectedDay,
    );
  }, [selectedDay, schedule]);

  const groupedSchedule =
    useMemo(() => {
      const groups = {};

      filteredSchedule.forEach(item => {
        if (!groups[item.day]) {
          groups[item.day] = {
            date: item.date,
            hearings: [],
          };
        }

        groups[item.day].hearings.push(
          item,
        );
      });

      return groups;
    }, [filteredSchedule]);

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const endOfToday = startOfToday + 24 * 60 * 60 * 1000;
  const endOfWeek = startOfToday + 7 * 24 * 60 * 60 * 1000;
  const scheduleSummary = {
    today: schedule.filter((item) => item.dateValue.getTime() >= startOfToday && item.dateValue.getTime() < endOfToday).length,
    week: schedule.filter((item) => item.dateValue.getTime() >= startOfToday && item.dateValue.getTime() < endOfWeek).length,
    upcoming: schedule.filter((item) => item.dateValue.getTime() >= startOfToday).length,
    pending: schedule.filter((item) => String(item.status || '').trim().toLowerCase() === 'pending').length,
  };

  const cycleDay = () => {
    const nextIndex =
      (dayIndex + 1) % days.length;

    setDayIndex(nextIndex);
    setSelectedDay(days[nextIndex]);
  };

  const handleHearingPress = hearing => {
    console.log(
      'Schedule hearing:',
      hearing,
    );

    // Hearing details navigation
    // will be connected later.
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>
        {/* HEADER */}

        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <Text style={styles.pageTitle}>
              My Schedule
            </Text>
            <SidebarMenuButton role="clerk" />
          </View>

          <Text style={styles.pageSubtitle}>
            View your upcoming hearings and
            daily schedule.
          </Text>
        </View>

        {/* SUMMARY */}

        <View
          style={[
            styles.summaryRow,
            isMobile &&
              styles.summaryColumn,
          ]}>
          <ScheduleSummaryCard
            title="TODAY"
            value={String(scheduleSummary.today)}
            subtitle="hearings"
            type="blue"
          />

          <ScheduleSummaryCard
            title="THIS WEEK"
            value={String(scheduleSummary.week)}
            subtitle="scheduled hearings"
            type="green"
          />

          <ScheduleSummaryCard
            title="UPCOMING"
            value={String(scheduleSummary.upcoming)}
            subtitle="future hearings"
            type="yellow"
          />

          <ScheduleSummaryCard
            title="PENDING"
            value={String(scheduleSummary.pending)}
            subtitle="requiring attention"
            type="red"
          />
        </View>

        {/* SCHEDULE CARD */}

        <View style={styles.mainCard}>
          {/* DAY FILTER */}

          <View
            style={[
              styles.filterRow,
              isMobile &&
                styles.filterColumn,
            ]}>
            <View>
              <Text
                style={styles.sectionTitle}>
                Weekly Schedule
              </Text>

              <Text
                style={styles.sectionSubtitle}>
                Your hearings for the
                selected period.
              </Text>
            </View>

            <View
              style={[
                styles.daySelectorContainer,
                isMobile &&
                  styles.mobileDaySelector,
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.daySelector}
                onPress={cycleDay}>
                <Text
                  style={styles.daySelectorText}>
                  {selectedDay}
                </Text>

                <Text
                  style={styles.arrow}>
                  ⌄
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SCHEDULE */}

          {Object.keys(groupedSchedule)
            .length === 0 ? (
            <View style={styles.emptyState}>
              <Text
                style={styles.emptyTitle}>
                No hearings scheduled
              </Text>

              <Text
                style={styles.emptyText}>
                There are no hearings for the
                selected day.
              </Text>
            </View>
          ) : (
            Object.keys(
              groupedSchedule,
            ).map(day => {
              const group =
                groupedSchedule[day];

              return (
                <View
                  key={day}
                  style={styles.daySection}>
                  <ScheduleDayHeader
                    day={day}
                    date={group.date}
                    count={
                      group.hearings.length
                    }
                  />

                  {group.hearings.map(
                    hearing => (
                      <ScheduleHearingCard
                        key={hearing.id}
                        hearing={hearing}
                        onPress={
                          handleHearingPress
                        }
                      />
                    ),
                  )}
                </View>
              );
            })
          )}

          {/* FOOTER */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Showing{' '}
              {filteredSchedule.length}{' '}
              scheduled hearings
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DEE0',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  headerSection: {
    marginTop: 25,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#19324D',
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 15,
    color: '#60758E',
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },

  summaryColumn: {
    flexDirection: 'column',
    gap: 0,
  },

  mainCard: {
    backgroundColor: '#FAF7EF',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
  },

  filterRow: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  filterColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#19324D',
  },

  sectionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#718197',
  },

  daySelectorContainer: {
    minWidth: 170,
  },

  mobileDaySelector: {
    width: '100%',
  },

  daySelector: {
    height: 44,
    minWidth: 170,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  daySelectorText: {
    fontSize: 13,
    color: '#273A50',
    fontWeight: '600',
  },

  arrow: {
    fontSize: 18,
    color: '#617388',
  },

  daySection: {
    marginBottom: 18,
  },

  emptyState: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263A50',
  },

  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: '#718197',
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E2DED5',
    marginTop: 8,
    paddingTop: 16,
  },

  footerText: {
    fontSize: 12,
    color: '#718197',
  },
});
