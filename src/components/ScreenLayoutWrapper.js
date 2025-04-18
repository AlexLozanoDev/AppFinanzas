// components/ScreenLayoutWrapper.js
import React from 'react';
import { TopNavigation, TopNavigationAction, Icon, Layout } from '@ui-kitten/components';

const MenuIcon = (props) => <Icon {...props} name="menu-outline" />;

const ScreenLayoutWrapper = ({ title, navigation, children }) => (
  <>
    <TopNavigation
      title={title}
      alignment="center"
      accessoryLeft={() => (
        <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
      )}
    />
    <Layout style={{ flex: 1 }}>
      {children}
    </Layout>
  </>
);

export default ScreenLayoutWrapper;
