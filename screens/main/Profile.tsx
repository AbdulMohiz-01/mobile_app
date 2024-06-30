import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "redux/slice/userSlice";
import { RootState } from "redux/store"; // Import RootState type
import { navigate } from "navigation/NavigationService";
import { icons } from "constants/paths";
import { theme } from "constants/theme";
import { User } from "model/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile: React.FC = () => {
  const user: User = useSelector((state: RootState) => state.user.user) || null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("AuthStack", {});
    }
  }, [user]);

  const handleLogOut = async () => {
    // remove the 'user' key from AsyncStorage
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
    dispatch(logout());
    navigate("AuthStack", {});
  };

  const handleEditProfile = () => {
    navigate("EditProfile", {});
  };

  if (!user) return null; // Add a loading state or a placeholder here if needed

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={[styles.profileImage, { backgroundColor: user?.profileColor }]}>
          <Text style={[styles.profileImageText, { backgroundColor: user?.profileColor || "#f7a102" }]}>
            {user?.name[0]?.toUpperCase() || "K"}
          </Text>
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
  );
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
    overflow: 'hidden',
  },
  profileImageText: {
    fontSize: 50,
    height: 20,
    overflow: 'hidden',
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
});

export default Profile;
