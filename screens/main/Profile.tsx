import { icons } from "constants/paths";
import { theme } from "constants/theme";
import { User } from "model/user";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "redux/slice/userSlice";
import store, { RootState } from "redux/store";
import { navigate } from "navigation/NavigationService";


const Profile: React.FC = () => {
  const user: User = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();



  const handleLogOut = () => {
    dispatch(logout());
    navigate("AuthStack", {});
  }

  const handleEditProfile = () => {
    navigate("EditProfile", {});
  }


  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={[styles.profileImage, { backgroundColor: user?.profileColor }]}>
          <Text style={[styles.profileImageText, { backgroundColor: user?.profileColor }]}>{user?.name[0].toLocaleUpperCase().toString()}</Text>
        </Text>
        {/* <TouchableOpacity>
          <Image source={icons['profileImageUpload']} style={styles.profileUploadIcon} />
        </TouchableOpacity> */}
        <Text style={{ color: "#fff", fontSize: 20, marginTop: 10 }}>{user?.name}</Text>
      </View>

      <View style={styles.lowerConatiner}>
        <TouchableOpacity onPress={handleEditProfile}>
          <View style={styles.lowerItem}>
            <View style={styles.lowerItemLeftSide}>
              <Image source={icons['editProfile']} style={styles.lowerItemIcon} />
              <Text style={styles.lowerItemText}>Edit Profile</Text>
            </View>
            <View>
              <Image source={icons['arrowRight']} style={styles.lowerItemArrowIcon} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut}>
          <View style={styles.lowerItem}>
            <View style={styles.lowerItemLeftSide}>
              <Image source={icons['logout']} style={styles.lowerItemIcon} />
              <Text style={[styles.lowerItemText, { color: "#fd5b5b" }]}>Logout</Text>
            </View>
            <View>
              <Image source={icons['arrowRight']} style={styles.lowerItemArrowIcon} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.primary_color,
  },
  upperContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerConatiner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
  },
  lowerItem: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: "#e8f3f9",
    borderBottomWidth: 1,
  },
  profileImage: {
    color: "#fff",
    backgroundColor: "blue",
    borderRadius: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // make it completely round
    width: 150,
    height: 150,
    textAlign: 'center',
    lineHeight: 150,

  },
  profileImageText: {
    fontSize: 50,
  },
  profileUploadIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  lowerItemLeftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lowerItemIcon: {
    width: 70,
    height: 70,
  },
  lowerItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lowerItemArrowIcon: {
    width: 20,
    height: 20,
  }
})

export default Profile;
