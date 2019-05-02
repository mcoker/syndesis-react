import { IntegrationMonitoring } from '@syndesis/models';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './App.css';
import { AppContext } from './AppContext';
import { UI } from './UI';
import { IConfigFile } from './WithConfig';

export interface IAppRoute {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact?: boolean;
  icon: string;
  label: string;
  to: string;
}

export interface IAppBaseProps {
  config: IConfigFile;
  routes: IAppRoute[];
}

export const App: React.FunctionComponent<IAppBaseProps> = ({
  config,
  routes,
}) => {
  const logout = () => {
    // do nothing
  };

  const getPodLogUrl = (
    monitoring: IntegrationMonitoring | undefined
  ): string | undefined => {
    if (
      !config ||
      !monitoring ||
      !monitoring.linkType ||
      !monitoring.namespace ||
      !monitoring.podName
    ) {
      return undefined;
    }
    const baseUrl = `${config.consoleUrl}/project/${
      monitoring.namespace
    }/browse/pods/${monitoring.podName}?tab=`;
    switch (monitoring.linkType) {
      case 'LOGS':
        return baseUrl + 'logs';
      case 'EVENTS':
        return baseUrl + 'events';
      default:
        return undefined;
    }
  };

  return (
    <AppContext.Provider
      value={{
        config,
        getPodLogUrl,
        logout,
      }}
    >
      <UI routes={routes} />
    </AppContext.Provider>
  );
};