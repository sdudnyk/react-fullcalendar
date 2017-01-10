// @flow
import React, { Component } from 'react';

import $ from 'jquery'
import FullCalendar from 'fullcalendar'

const views = {
  day: 'agendaDay',
  week: 'agendaWeek',
  month: 'month'
};
import moment from 'moment'

class Calendar extends Component {

  calendar = null;

  initFullCalendar(domNode) {
    const {view, events, selectable, header, customButtons, defaultDate, nowIndicator, locale} = this.props;
    moment.locale(locale);
    require(`fullcalendar/dist/locale/${locale}`)
    this.calendar = $(domNode).fullCalendar({
      view: views[view],
      events,
      selectable,
      header,
      customButtons,
      defaultDate,
      nowIndicator,
      dayClick: this.onDayClick,
      eventClick: this.onEventClick,
      locale
    });
  }

  destroyFullCalendar() {
    this.calendar.fullCalendar('destroy');
  }

  onDayClick = (date, jsEvent, view) => {
    const object = $(this);
    if (this.props.onDayClick) {
      this.props.onDayClick(date, jsEvent, view, object);
    }
  };

  onEventClick(calEvent, jsEvent, view) {
    if (this.props.onEventClick) {
      this.props.onEventClick(calEvent, jsEvent, view);
    }
  };

  componentDidMount() {
    const {calendar} = this.refs;
    this.initFullCalendar(calendar);

  }

  componentWillUnmount() {
    this.destroyFullCalendar()
  }

  componentWillReceiveProps(nextProps) {
    let events = nextProps.events;
      this.calendar.fullCalendar('changeView', views[nextProps.view]);
      this.calendar.fullCalendar('gotoDate',  nextProps.date);
      this.calendar.fullCalendar('removeEvents');
      this.calendar.fullCalendar('addEventSource', events);
  }


  render() {
    return (<div ref="calendar"></div>);
  }
}
;

Calendar.defaultProps = {
  view: 'week',
  events: [],
  selectable: false,
  header: {
    left: 'agendaDay,basicWeek,month',
    center: 'title',
    right: 'today prev,next',
  },
  customButtons: {},
  defaultDate: null,
  nowIndicator: true,
  locale: 'ru'
};

export default Calendar;
