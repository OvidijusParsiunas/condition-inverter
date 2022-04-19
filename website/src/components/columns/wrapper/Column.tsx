import { ComponentsAsProp } from '../../../shared/types/componentsAsProp';
import './column.css';

type Props = {
  children: ComponentsAsProp;
};

export default function Column(props: Props) {
  const { children } = props;

  return <div className="column">{children}</div>;
}
