import { DateRange as ReactDateRange } from 'react-date-range'
import styled from 'styled-components'

const DateRangeStyled = styled(ReactDateRange)`
  & {
    width: 100%;
    max-width: 520px;
    position: relative;
    overflow: auto;
  }
  .rdrMonths {
    justify-content: space-between;
  }
  .rdrMonth {
    min-width: 252px !important;
    padding: 0;
  }
  .rdrMonth:last-child .rdrDays {
    justify-content: flex-end;
  }

  .rdrNextPrevButton {
    margin: 0;
  }
  .rdrMonthName {
    text-align: center;
  }
  // Hide week days
  .rdrWeekDays {
    display: none;
  }
  .rdrDayDisabled {
    background: transparent;
  }
  .rdrDayNumber {
    top: 2px;
    bottom: 2px;
  }
  // Add line through number for disabled dates
  .rdrDayDisabled .rdrDayNumber span {
    text-decoration-line: line-through;
    color: var(--error);
  }
  .rdrDayNumber span {
    font-size: 12px;
    line-height: 32px;
  }
  // Remove passive days(days for previous month on view current month)
  .rdrDayPassive {
    opacity: 0;
  }
  .rdrDay {
    width: 36px;
    height: 36px;
  }
  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    top: 0;
    bottom: 0;
    left: 0 !important;
    right: 0 !important;
  }
  .rdrStartEdge,
  .rdrEndEdge {
    border-radius: 20px;
    z-index: 1;
  }

  .rdrDay .rdrStartEdge + .rdrDayNumber,
  .rdrDay .rdrEndEdge + .rdrDayNumber {
    z-index: 1;
  }
  .rdrInRange {
    color: transparent !important;
  }

  .rdrDay .rdrInRange + .rdrDayNumber {
    left: -8px !important;
    right: -8px !important;
    box-shadow: 10px 0px 0px 0px #f4f4f4;
  }
  .rdrDay.rdrDayStartOfWeek .rdrInRange + .rdrDayNumber,
  .rdrDay.rdrDayStartOfMonth .rdrInRange + .rdrDayNumber {
    left: 0px !important;
    right: 0 !important;
    box-shadow: 10px 0px 0px 0px #f4f4f4;
  }
  .rdrDay.rdrDayEndOfWeek .rdrInRange + .rdrDayNumber,
  .rdrDay.rdrDayEndOfMonth .rdrInRange + .rdrDayNumber {
    right: 0 !important;
    left: 0px !important;
    box-shadow: -10px 0px 0px 0px #f4f4f4;
  }
  .rdrDay .rdrInRange + .rdrDayNumber {
    background-color: #f4f4f4;
  }
  .rdrDay .rdrInRange + .rdrDayNumber span,
  .rdrMonthName {
    color: #1d2429;
  }

  .rdrMonthAndYearWrapper {
    width: 520px;
    padding: 14px 0;
    position: absolute;
    left: 0;
    right: 0;
  }
  .rdrMonthAndYearWrapper:before {
    display: none;
  }
  .rdrMonthName {
    padding: 20px 0;
    font-size: 14px;
  }

  .rdrMonthAndYearPickers {
    display: none;
  }
  .rdrNextPrevButton {
    background: transparent;
  }
  .rdrDayToday .rdrDayNumber span:after {
    display: none;
  }
  .rdrDayToday {
    border: 1px solid #3d91ff;
    border-radius: 24px;
    position: relative;
    z-index: 1;
  }
  .rdrDayToday > span {
    top: 1px;
    left: 1px !important;
    bottom: 1px;
    right: 1px !important;
  }
`

export { DateRangeStyled }
