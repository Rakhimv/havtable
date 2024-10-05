import { Select, SelectItem, Avatar, Chip, SelectedItems } from "@nextui-org/react";
import { useState } from "react";


type Tovar = {
    id: number
    name: string;
    img: string;
    price: number;
};

type Props = {
    selDATA: any,
    sels?: any[]
}

export default function TovarSelect(props: Props) {

    const [tovars] = useState<Tovar[]>(JSON.parse(localStorage.getItem("tovars") || "[]"))


    return (
        <Select
            items={tovars}
            variant="bordered"
            isMultiline={true}
            selectionMode="multiple"
            placeholder="Выбери товары"
            selectedKeys={props.sels && props.sels.map((key) => String(key))}
            classNames={{
                base: "max-w-auto",
                trigger: "min-h-12 py-2",
            }}
            renderValue={(items: SelectedItems<Tovar>) => {
                return (
                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => {
                            return (
                                <Chip key={item.data?.id}>{item.data?.name}</Chip>
                            )
                        })}
                    </div>
                );
            }}
            onChange={(e) => {
                props.selDATA(e.target.value);

            }}
        >
            {(user) => (
                <SelectItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                        <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.img} />
                        <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">{user.price}</span>
                        </div>
                    </div>
                </SelectItem>
            )}
        </Select>
    );
}