import {createElement, forwardRef} from 'rax';
import {isWeex} from 'universal-env';

let Text = (props, ref) => {
  let {children} = props;
  if (!Array.isArray(children)) {
    children = [children];
  }

  let nativeProps = {
    ...props,
    ...{
      style: props.style || {},
    },
  };

  let textString = '';
  if (props.children != null) {
    if (!Array.isArray(props.children)) {
      textString = props.children.toString();
    } else {
      textString = props.children.join('');
    }
  }

  if (props.onPress) {
    nativeProps.onClick = props.onPress;
  }

  if (isWeex) {
    if (props.numberOfLines) {
      nativeProps.style.lines = props.numberOfLines;
    }

    nativeProps.value = textString;

    return <text ref={ref} {...nativeProps} />;
  } else {
    let styleProps = {
      whiteSpace: 'pre-wrap',
      ...nativeProps.style
    };
    let numberOfLines = props.numberOfLines;
    if (numberOfLines) {
      if (parseInt(numberOfLines) === 1) {
        styleProps.whiteSpace = 'nowrap';
      } else {
        styleProps.display = '-webkit-box';
        styleProps.webkitBoxOrient = 'vertical';
        styleProps.webkitLineClamp = String(numberOfLines);
      }

      styleProps.overflow = 'hidden';
    }

    return <span {...nativeProps} ref={ref} style={{...styles.text, ...styleProps}}>{textString}</span>;
  }
};

let styles = {
  text: {
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'block',
    flexDirection: 'column',
    alignContent: 'flex-start',
    flexShrink: 0,
    fontSize: 32
  }
};

Text = forwardRef(Text);

export default Text;