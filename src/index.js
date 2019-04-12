import {createElement} from 'rax';
import {isWeex} from 'universal-env';

export default (props) => {
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

    return <text {...nativeProps} />;
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

    return <span className="text" {...nativeProps} style={{...styles.text, ...styleProps}}>{textString}</span>;
  }
};

let styles = {
  text: {
    border: '0 solid black',
    box-sizing: 'border-box',
    display: 'block',
    flex-direction: 'column',
    align-content: 'flex-start',
    flex-shrink: 0,
    font-size: 32
  }
}