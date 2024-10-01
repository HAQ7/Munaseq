import { Label } from "./shadcn-ui/label"
import { RadioGroup , RadioGroupItem } from "./shadcn-ui/radio-group"


export default function Radio(props: {
    options: string[];
    name: string;
}) {
    return (
        <RadioGroup name={props.name} id={props.name} defaultValue={props.options[0]} required>
            {props.options.map((option, index) => {
                return (
                    <div key={index} className="flex items-center space-x-2 gap-1">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                    </div>
                );
            })}
        </RadioGroup>
    );
}
