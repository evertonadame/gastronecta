import { BaseToast } from "react-native-toast-message";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BaseToastUI = ({ text1, text2, type, props, ...rest }) => {
  const colors = {
    success: "#4BB543",
    error: "#FF0000",
  };

  const icons = {
    success: "check-circle",
    error: "alert-circle",
  };

  return (
    <BaseToast
      {...rest}
      text1={text1}
      renderLeadingIcon={() => (
        <MaterialCommunityIcons
          name={icons[type]}
          size={30}
          color={colors[type]}
        />
      )}
      text2NumberOfLines={2}
      text2={text2}
      style={{
        borderLeftWidth: 0,
        padding: 20,
        height: 90,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
      }}
      contentContainerStyle={{}}
      text1Style={{
        fontSize: 16,
        color: colors[type],
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
      }}
    />
  );
};

const toastConfig = {
  success: (props) => <BaseToastUI {...props} />,

  error: (props) => <BaseToastUI {...props} />,
};

export default toastConfig;
