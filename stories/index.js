import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

// Component
import Calendar from '..'
// FullCalendar deps
import 'fullcalendar/dist/fullcalendar.css'

storiesOf('Calendar', module)
  .add('Basic', () => (
    <Calendar />
  ));
