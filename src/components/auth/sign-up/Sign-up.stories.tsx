import type {Meta, StoryObj} from "@storybook/react";
import SignUp from "@/components/auth/sign-up/Sign-up";

const meta = {
    tags: ['autodocs'],
    component: SignUp,
    title: "Components/Auth/SignUp/SignUp"
} satisfies Meta<typeof SignUp>

export default meta;

type Story = StoryObj<typeof meta>

export const SignUpStory: Story = {
    render: () =>{
     return <SignUp/>
    }
}