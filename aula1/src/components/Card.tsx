import { View, Text } from "react-native"
import { FC } from "react";

interface Props {
    name: string;
    job: string;
}

const Card: FC<Props> = ({name, job}) => {
    return(
        <View>
            <Text>{name}</Text>
            <Text>{job}</Text>
        </View>
    );
};

export default Card;