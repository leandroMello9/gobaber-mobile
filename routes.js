import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignIn from '~/pages/signIn';
import SignUp from '~/pages/singUp';
import DashBoard from './src/pages/Dashboard';
import Profile from '~/pages/Profile/index';
import SelectProvider from '~/pages/SelectProvider';
import SelectDateTime from '~/pages/SelectDateTime';
import Confirm from '~/pages/Confirm';

export default (signedIn = false) =>
  // Conjunto de rotas
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            DashBoard,
            New: {
              // Rotas em pilhas
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  Confirm,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    // Aplica na <- 20 px de margin
                    headerLeftContainerStyle: {
                      marginLeft: 10,
                    },
                    headerTitleAlign: 'center',
                  },
                }
              ),
              // Opções da navegação, tudo que sera aplicado na pilha da stack new
              navigationOptions: {
                // Faz as opções de rotas desapareceram
                tabBarVisible: false,

                // Muda a label onde seleciona a rota
                tabBarLabel: 'Agendar',
                // Define um icone para a label
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255,255,255,0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
            // Toda vez que sair de uma rota ela vai resetar
            resetOnBlur: true,
            // Definindo estilo da tabBar
            tabBarOptions: {
              // Ao teclado abrir passe por cima da tabBar
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#8b41a8',
              },
            },
          }
        ),
      },
      {
        // Configuração para verificar se o usuario esta logado ou não
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
