import fmtEvent from './fmtEvent';

Component({
  data: {},
  props: {
    className: '',
    style: '',
    numberOfLines: 0,
    onClick: function onClick() {}
  },
  didMount: function didMount() {},
  methods: {
    onClick: function onClick(e) {
      var event = fmtEvent(this.props, e);
      this.props.onClick(event);
    }
  }
});
