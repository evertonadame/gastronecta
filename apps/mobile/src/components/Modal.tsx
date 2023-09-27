import React from "react";
import { Modal, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import GestureRecognizer from "react-native-swipe-gestures";

type ModalProps = React.ComponentProps<typeof Modal> & {
  visible: boolean;
  closeModal: () => void;
};

const ModalUI = ({ ...props }: ModalProps) => {
  const { visible, closeModal, children, ...restProps } = props;
  return (
    <View className="flex-1 justify-center items-center w-full">
      <GestureRecognizer onSwipeDown={() => closeModal()}>
        <Modal
          {...restProps}
          animationType="slide"
          transparent={true}
          visible={visible}
        >
          <View className="flex-1 justify-center items-center bg-secondary-200 rounded-t-3xl mt-6 w-full">
            {children}
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
};

export default ModalUI;
