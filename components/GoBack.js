import { useNavigation } from "@react-navigation/native";

const GoBack = (onPress) => {
  const navigation = useNavigation();

  return <GoBack onPress={() => NavigationContainer.navigate(onPress)} />;
};
export default GoBack;
