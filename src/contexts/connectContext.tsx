import React from 'react';
import { Subtract } from 'utils/types';

/**
 * HOC to connect components to a context via a selector function.
 *
 * @param selector Selects which parts of the state the component should depend on.
 */
export const connectContext = <ContextState extends {}, InjectedState extends {}>(
  selector: (state: ContextState) => InjectedState,
  context: React.Context<ContextState>
) => <TOriginalProps extends {}>(Component: React.ComponentType<TOriginalProps>) => (
  props: Subtract<TOriginalProps, InjectedState>
) => {
  const selectedState = selector(React.useContext(context));

  return <Component {...(props as any)} {...selectedState} />;
};
