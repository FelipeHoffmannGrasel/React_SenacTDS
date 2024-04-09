import { FC } from "react";
import { View } from "react-native"
import StyledText from "./Text";

interface Props{
    name: string;
    job: string;
}

const Header: FC<Props> = ({name, job}) => {
    return (
        <View>
            <StyledText>{name}</StyledText>
            <StyledText>{job}</StyledText>
        </View>
    )
}

export default Header;