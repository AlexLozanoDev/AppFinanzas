// components/BottomTabs.js
import React, { useState } from 'react';
import { Layout, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import Home from '../screens/Home';
import RegistrosScreen from '../screens/RegistrosScreen';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const RegistrosIcon = (props) => <Icon {...props} name="list-outline" />;

const BottomTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderScreen = () => {
    switch (selectedIndex) {
      case 0:
        return <Home />;
      case 1:
        return <RegistrosScreen />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        {renderScreen()}
      </Layout>
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <BottomNavigationTab title='Inicio' icon={HomeIcon} />
        <BottomNavigationTab title='Registros' icon={RegistrosIcon} />
      </BottomNavigation>
    </Layout>
  );
};

export default BottomTabs;
