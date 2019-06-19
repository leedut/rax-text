import { createElement } from 'rax';
import { isWeex } from 'universal-env';
import { Props } from './types';

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

export default (props: Props) => {
  let { children } = props;
  if (!Array.isArray(children)) {
    children = [children];
  }

  let nativeProps: any = {
    ...props,
    ...{
      style: props.style || {},
    },
  };

  let textString = '';
  if (children != null) {
    if (!Array.isArray(children)) {
      textString = children;
    } else {
      textString = children.join('');
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
      if (numberOfLines === 1) {
        styleProps.whiteSpace = 'nowrap';
      } else {
        styleProps.display = '-webkit-box';
        styleProps.WebkitBoxOrient = 'vertical';
        styleProps.WebkitLineClamp = numberOfLines;
      }
      styleProps.overflow = 'hidden';
    }
    return <span {...nativeProps} style={{...styles.text, ...styleProps}}>{textString}</span>;
  }
};
