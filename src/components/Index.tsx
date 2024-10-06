import { Button, Card, CardFooter, Image } from "@nextui-org/react"
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Product } from "./Change";

export const days = [
    {
        id: 'mon',
        text: 'Понедельник'
    },
    {
        id: 'thu',
        text: 'Вторник'
    },
    {
        id: 'wen',
        text: 'Среда'
    },
    {
        id: 'tho',
        text: 'Четверг'
    },
    {
        id: 'fri',
        text: 'Пятница'
    },
    {
        id: 'sun',
        text: 'Суббота'
    },
    {
        id: 'sat',
        text: 'Воскресенье'
    }
]



const Index = () => {

    const [havtable, sethavtable] = useState<any>([]);

    function updateHavtable() {
        let havtable = localStorage.getItem('havtable') || '[]';
        sethavtable(JSON.parse(havtable))

        console.log(havtable);


    }



    useEffect(() => {
        updateHavtable()
    }, [])



    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-[500px] px-[20px] w-full">
                <div className="mt-[40px] w-full flex gap-[10px]">
                    <Link to={'/settings'}>
                        <Button isIconOnly variant="bordered" color="primary">
                            <IoSettingsOutline size={20} />
                        </Button>
                    </Link>
                    <Link to={'/shop'}>
                        <Button isIconOnly variant="bordered" color="primary">
                            <FaShoppingBasket size={20} />
                        </Button>
                    </Link>
                    <Link to={'/change'}>
                        <Button isIconOnly variant="bordered" color="primary">
                            <LuSettings2 size={20} />
                        </Button>
                    </Link>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[20px] mb-[40px] items-center">
                    {days.map((day) => {

                        return (
                            <>
                                <div className="w-full flex justify-center p-[10px] bg-white rounded-lg">
                                    <p className="text-black font-bold">{day.text}</p>
                                </div>
                                {
                                    havtable.length !== 0 && havtable[day.id].length > 0 ?
                                        <div className="w-full flex flex-col mt-[-10px] gap-[10px]">
                                            {havtable[day.id].map((product: Product) => {
                                                return (
                                                    <div key={product.id}>
                                                        <Card shadow="sm" key={product.id} className="flex flex-row items-center p-[10px] w-full py-[0px]" >

                                                            <Image
                                                                shadow="sm"
                                                                radius="lg"
                                                                alt={product.name}
                                                                className="object-cover w-[50px] h-[50px]"
                                                                src={product.img}
                                                            />

                                                            <CardFooter className="w-full flex justify-between items-center">
                                                                <div className="flex flex-col items-start">
                                                                    <b className="truncate whitespace-nowrap overflow-hidden max-w-xs">{product.name}</b>
                                                                    <p className="textprange text-default-500">{product.price} ₽</p>
                                                                </div>
                                                            </CardFooter>
                                                        </Card>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        : null
                                }

                            </>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index