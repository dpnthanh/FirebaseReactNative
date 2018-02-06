import {StackNavigator} from 'react-navigation'
import LoginScreen from '../screens/login'
import RegisterScreen from '../screens/register'
import HomeScreen from '../screens/home'
import UpLoadImage from '../screens/upImage'
export default StackNavigator({
    // upload:{
    //     screen: UpLoadImage,
    //     navigationOptions:{
    //         header: false
    //     }
    // },
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
    // },
    home:{
        screen: HomeScreen,
        navigationOptions:{
            headerTitle: 'HOME'
        }
    },
})