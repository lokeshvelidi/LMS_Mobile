import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import CalendarHeader from '../../../components/clerk/hearingCalendar/CalendarHeader';

import CalendarDay from '../../../components/clerk/hearingCalendar/CalendarDay';

import HearingCalendarItem from '../../../components/clerk/hearingCalendar/HearingCalendarItem';
import {getClerkHearings} from '../../../services/api/clerkService';

/* Legacy sample records intentionally disabled. The screen uses API data only.
const HEARINGS = [
  {
    id: '1',
    date: 17,
    month: 7,
    year: 2026,
    day: 'Mon',
    time: '10:00 AM',
    caseNo: 'LC-2026-103',
    client: 'test',
    court: 'District Court',
    type: 'Hearing',
    status: 'Scheduled',
    color: '#E1EAF8',
  },
  {
    id: '2',
    date: 17,
    month: 7,
    year: 2026,
    day: 'Mon',
    time: '12:30 PM',
    caseNo: 'CIV-2026-006',
    client: 'Suresh Reddy',
    court: 'Civil Court',
    type: 'Mention',
    status: 'Scheduled',
    color: '#E5F0E6',
  },
  {
    id: '3',
    date: 18,
    month: 7,
    year: 2026,
    day: 'Tue',
    time: '10:30 AM',
    caseNo: 'CR-2026-004',
    client: 'Farhan Khan',
    court: 'Sessions Court',
    type: 'Evidence',
    status: 'Scheduled',
    color: '#F4E9D5',
  },
  {
    id: '4',
    date: 19,
    month: 7,
    year: 2026,
    day: 'Wed',
    time: '11:00 AM',
    caseNo: 'LC-2026-102',
    client: 'test',
    court: 'High Court',
    type: 'Hearing',
    status: 'Scheduled',
    color: '#E1EAF8',
  },
  {
    id: '5',
    date: 20,
    month: 7,
    year: 2026,
    day: 'Thu',
    time: '02:00 PM',
    caseNo: 'CR-2026-003',
    client: 'Naveen Reddy',
    court: 'District Court',
    type: 'Arguments',
    status: 'Scheduled',
    color: '#E5F0E6',
  },
  {
    id: '6',
    date: 21,
    month: 7,
    year: 2026,
    day: 'Fri',
    time: '10:00 AM',
    caseNo: 'LC-2026-101',
    client: 'Satish',
    court: 'District Court',
    type: 'Hearing',
    status: 'Adjourned',
    color: '#F8E5C8',
  },
]; */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const getDaysInMonth = (
  year,
  month,
) => {
  return new Date(
    year,
    month + 1,
    0,
  ).getDate();
};

const getFirstDayOfMonth = (
  year,
  month,
) => {
  return new Date(
    year,
    month,
    1,
  ).getDay();
};

const ClerkHearingCalendarScreen = () => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const today = new Date();

  const [currentMonth, setCurrentMonth] =
    useState(today.getMonth());

  const [currentYear, setCurrentYear] =
    useState(today.getFullYear());

  const [selectedDate, setSelectedDate] =
    useState(null);
  const [hearings, setHearings] = useState([]);
  useEffect(() => {
    getClerkHearings()
      .then((items) => setHearings(items.flatMap((item) => {
        const timestamp = item.hearingDate ? new Date(item.hearingDate) : null;
        if (!timestamp || Number.isNaN(timestamp.getTime())) return [];
        const purpose = item.purpose ?? '';
        const icon = purpose.toLowerCase().includes('meeting') ? 'people-outline' : purpose.toLowerCase().includes('mediation') ? 'git-branch-outline' : 'calendar-outline';
        return [{ id: item.hearingId, caseId: item.caseId, date: timestamp.getDate(), month: timestamp.getMonth(), year: timestamp.getFullYear(), day: WEEK_DAYS[timestamp.getDay()], time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), caseNo: item.caseNumber ?? '-', client: item.client?.name ?? '-', court: item.courtHall ?? '-', type: purpose || '-', status: item.status ?? '-', icon, color: '#E1EAF8' }];
      })))
      .catch(() => setHearings([]));
  }, []);

  const monthName =
    MONTHS[currentMonth];

  const daysInMonth =
    getDaysInMonth(
      currentYear,
      currentMonth,
    );

  const firstDay =
    getFirstDayOfMonth(
      currentYear,
      currentMonth,
    );

  const calendarDays = useMemo(() => {
    const days = [];

    for (
      let i = 0;
      i < firstDay;
      i += 1
    ) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day += 1
    ) {
      days.push(day);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const selectedHearings =
    useMemo(() => {
      if (!selectedDate) {
        return [];
      }

      return hearings.filter(
        hearing =>
          hearing.date ===
            selectedDate &&
          hearing.month ===
            currentMonth &&
          hearing.year ===
            currentYear,
      );
    }, [
      selectedDate,
      currentMonth,
      currentYear,
      hearings,
    ]);

  const getHearingsForDate = day => {
    if (!day) {
      return [];
    }

    return hearings.filter(
      hearing =>
        hearing.date === day &&
        hearing.month === currentMonth &&
        hearing.year === currentYear,
    );
  };

  const goPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(
        currentYear - 1,
      );
    } else {
      setCurrentMonth(
        currentMonth - 1,
      );
    }

    setSelectedDate(null);
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(
        currentYear + 1,
      );
    } else {
      setCurrentMonth(
        currentMonth + 1,
      );
    }

    setSelectedDate(null);
  };

  const goToday = () => {
    setCurrentMonth(
      today.getMonth(),
    );

    setCurrentYear(
      today.getFullYear(),
    );

    setSelectedDate(
      today.getDate(),
    );
  };

  const handleHearingPress = hearing => {
    console.log(
      'Selected hearing:',
      hearing,
    );
  };

  const isToday = day => {
    return (
      day === today.getDate() &&
      currentMonth ===
        today.getMonth() &&
      currentYear ===
        today.getFullYear()
    );
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
          <Text style={styles.pageTitle}>
            Hearing Calendar
          </Text>

          <Text style={styles.pageSubtitle}>
            View hearings by date and manage
            your court schedule.
          </Text>
        </View>

        {/* MAIN CARD */}

        <View style={styles.mainCard}>
          <CalendarHeader
            month={monthName}
            year={currentYear}
            onPrevious={
              goPreviousMonth
            }
            onNext={goNextMonth}
            onToday={goToday}
          />

          {/* WEEK HEADER */}

          <View style={styles.weekHeader}>
            {WEEK_DAYS.map(day => (
              <View
                key={day}
                style={styles.weekDay}>
                <Text
                  style={
                    styles.weekDayText
                  }>
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* CALENDAR */}

          <View style={styles.calendarGrid}>
            {calendarDays.map(
              (day, index) => {
                const hearings =
                  getHearingsForDate(
                    day,
                  );

                const dayOfWeek =
                  day
                    ? new Date(
                        currentYear,
                        currentMonth,
                        day,
                      ).getDay()
                    : null;

                return (
                  <View
                    key={`${day}-${index}`}
                    style={[
                      styles.calendarCell,
                      isMobile &&
                        styles.mobileCalendarCell,
                    ]}>
                    {day ? (
                      <CalendarDay
                        day={
                          WEEK_DAYS[
                            dayOfWeek
                          ]
                        }
                        date={day}
                        isToday={isToday(
                          day,
                        )}
                        isSelected={
                          selectedDate ===
                          day
                        }
                        hearings={hearings}
                        onPress={() =>
                          setSelectedDate(
                            day,
                          )
                        }
                      />
                    ) : (
                      <View
                        style={
                          styles.emptyCalendarCell
                        }
                      />
                    )}
                  </View>
                );
              },
            )}
          </View>

          {/* SELECTED DAY */}

          <View
            style={
              styles.selectedSection
            }>
            <View
              style={
                styles.selectedHeader
              }>
              <View>
                <Text
                  style={
                    styles.selectedTitle
                  }>
                  {selectedDate
                    ? `${selectedDate} ${monthName} ${currentYear}`
                    : 'Select a date'}
                </Text>

                <Text
                  style={
                    styles.selectedSubtitle
                  }>
                  {selectedDate
                    ? `${selectedHearings.length} hearing${selectedHearings.length === 1 ? '' : 's'} scheduled`
                    : 'Select a calendar date to view hearings'}
                </Text>
              </View>
            </View>

            {selectedDate &&
              selectedHearings.length >
                0 && (
                <View
                  style={
                    styles.hearingList
                  }>
                  {selectedHearings.map(
                    hearing => (
                      <HearingCalendarItem
                        key={
                          hearing.id
                        }
                        hearing={
                          hearing
                        }
                        onPress={
                          handleHearingPress
                        }
                      />
                    ),
                  )}
                </View>
              )}

            {selectedDate &&
              selectedHearings.length ===
                0 && (
                <View
                  style={
                    styles.emptySelected
                  }>
                  <Text
                    style={
                      styles.emptySelectedTitle
                    }>
                    No hearings
                  </Text>

                  <Text
                    style={
                      styles.emptySelectedText
                    }>
                    There are no hearings
                    scheduled for this
                    date.
                  </Text>
                </View>
              )}
          </View>

          {/* LEGEND */}

          <View style={styles.legend}>
            <Text style={styles.legendTitle}>
              Status
            </Text>

            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor:
                      '#287A43',
                  },
                ]}
              />

              <Text
                style={styles.legendText}>
                Scheduled
              </Text>
            </View>

            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor:
                      '#A36B12',
                  },
                ]}
              />

              <Text
                style={styles.legendText}>
                Adjourned
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClerkHearingCalendarScreen;

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

  mainCard: {
    backgroundColor: '#FAF7EF',
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },

  weekHeader: {
    flexDirection: 'row',
    marginTop: 12,
  },

  weekDay: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2EDDF',
    borderWidth: 1,
    borderColor: '#E2DED5',
  },

  weekDayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#61738A',
    textTransform: 'uppercase',
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarCell: {
    width: '14.2857%',
  },

  mobileCalendarCell: {
    minWidth: 100,
  },

  emptyCalendarCell: {
    flex: 1,
    minHeight: 150,
    backgroundColor: '#F5F1E8',
    borderWidth: 1,
    borderColor: '#E2DED5',
  },

  selectedSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2DED5',
  },

  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  selectedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#19324D',
  },

  selectedSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#718197',
  },

  hearingList: {
    marginTop: 14,
  },

  emptySelected: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptySelectedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#263A50',
  },

  emptySelectedText: {
    marginTop: 4,
    fontSize: 12,
    color: '#718197',
  },

  legend: {
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2DED5',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },

  legendTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#526477',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },

  legendText: {
    fontSize: 11,
    color: '#64758A',
  },
});
