import {StackNavigator} from 'react-navigation'
// import LoginScreen from '../screens/login'
// import RegisterScreen from '../screens/register'
import HomeScreen from '../screens/home'
export default StackNavigator({
    home:{
        screen: HomeScreen,
        navigationOptions:{
            headerTitle: 'HOME'
        }
    },
    // login:{
    //     screen: LoginScreen,
    //     navigationOptions:{
    //         headerTitle: 'Login'
    //     }
    // },
    // register:{
    //     screen: RegisterScreen,
    //     navigationOptions:{
    //         headerTitle: 'Register'
    //     }
    // }
})