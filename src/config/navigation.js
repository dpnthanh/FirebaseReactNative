import {StackNavigator} from 'react-navigation'
import LoginScreen from '../screens/login'
import RegisterScreen from '../screens/register'
export default StackNavigator({
    login:{
        screen: LoginScreen,
        navigationOptions:{
            headerTitle: 'Login'
        }
    },
    register:{
        screen: RegisterScreen,
        navigationOptions:{
            headerTitle: 'Register'
        }
    }
})