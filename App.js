import React from 'react';
import './style.css';

// Задание
// Допишите код так, чтобы DatePicker был контролируемым компонентом.
// При выборе даты в input'е, текст на ним должен обновляться и показывать выбранную дату
// При нажатии на кнопку Reset date, input должен очищаться, а надпись становаиться 'Select date'
// Документация по JQuery UI
// https://jqueryui.com/datepicker
// https://api.jqueryui.com/datepicker

class DatePicker extends React.Component {
  inputRef = null;
  componentDidMount() {
    $(this.inputRef).datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: this.props.handleClick,
    });
    $(this.inputRef).datepicker('setDate', this.props.value || '');
  };

  componentDidUpdate() {
    $(this.inputRef).datepicker('setDate', this.props.value || '');
  };

  render() {
    return (
      <input
        ref={(domElement) => {
          this.inputRef = domElement;
        }}
      />
    );
  };
}

export default class App extends React.Component {
  state = {
    date: '1/4/2023',
  };

  onSelectUpdateDate = (newDate) => {
    this.setState(() => ({
      date: newDate,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.date ? `Date: ${this.state.date}` : 'Select date'}{' '}
        </div>
        <div>
          <DatePicker handleClick={(newDate) => handleDatePickerClick(this, newDate)}
            value={this.state.date} />
        </div>
        <div>
          <button onClick={() => handleResetBtnClick(this)}>Reset date</button>
        </div>
      </React.Fragment>
    );
  };
}

function handleDatePickerClick(datePicker, newDate) {
  datePicker.onSelectUpdateDate(newDate);
}

function handleResetBtnClick(btn) {
  btn.onSelectUpdateDate();
}