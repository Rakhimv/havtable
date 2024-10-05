import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";
import { days } from "./Index";
import { MdOutlineAdd } from "react-icons/md";
import { Product } from "./Change";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Card, CardFooter, Image, useDisclosure } from "@nextui-org/react"
import { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useState } from "react";



const Settings = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [products, setProducts] = useState<Product[]>([]);
    const [havtable, sethavtable] = useState<any>([]);
    const [day, setDay] = useState<string>('');

    function updateProducts() {
        let products = localStorage.getItem('products') || '[]';
        setProducts(JSON.parse(products))
    }
    function updateHavtable() {
        let havtable = localStorage.getItem('havtable') || '[]';
        sethavtable(JSON.parse(havtable))

        console.log(havtable);


    }

    function deleteProduct(pid: number, did: string) {
        let products = JSON.parse(localStorage.getItem('havtable') || "[]")
        if(products) {
            products[did] = products[did].filter((item2: Product) => {
                return item2.id !== pid
            })
            localStorage.setItem('havtable', JSON.stringify(products))
        }
        updateProducts()
        updateHavtable()
    }


    useEffect(() => {
        updateProducts()
        updateHavtable()
    }, [])



    function addProduct(item: Product) {

        onOpenChange()
        if (!localStorage.getItem('havtable')) {
            let data = {
                mon: [],
                thu: [],
                wen: [],
                tho: [],
                fri: [],
                sun: [],
                sat: []
            }
            localStorage.setItem('havtable', JSON.stringify(data))
        }

        let data = JSON.parse(localStorage.getItem('havtable') || "[]")


        let prov = data[day].filter((item2: Product) => {
            return item2.id === item.id
        })


        if (prov.length == 0) {
            // @ts-ignore
            data[day].push(item)
        }

        localStorage.setItem('havtable', JSON.stringify(data))
        updateHavtable()
        updateProducts()


    }


    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-[500px] px-[20px] w-full">
                <div className="mt-[40px] w-full">
                    <Link to={'/'}>
                        <Button isIconOnly variant="bordered" color="primary">
                            <IoMdArrowRoundBack size={20} />
                        </Button>
                    </Link>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[20px] items-center mb-[40px]">
                    {days.map((day) =>
                        <>
                            <div className="mt-[20px] w-full flex border-1 border-white justify-center p-[10px] bg-black rounded-lg">
                                <p className="text-white font-bold">{day.text}</p>
                            </div>




                            {havtable.length !== 0 && havtable[day.id].length > 0 ?
                                <div className="w-full flex flex-col gap-[10px]">
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

                                                        <Button
                                                            onClick={() => {
                                                                deleteProduct(product.id, day.id)
                                                            }}
                                                            isIconOnly
                                                            color="danger">
                                                            <RiDeleteBin5Line className="" />
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}


                            <Button
                                variant="light"
                                onClick={() => {
                                    onOpen()
                                    setDay(day.id)
                                }} endContent={<MdOutlineAdd />} className="mt-[-10px] w-full">
                                Добавить
                            </Button>
                        </>
                    )}
                </div>
            </div>



            <Modal placement="center" backdrop="blur"  isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>

                    <>
                        <ModalHeader className="flex flex-col gap-1">Добавить продукт</ModalHeader>


                        <ModalBody>

                            <div className="w-full flex flex-col gap-[10px] mb-[30px]">
                                {products.map((item: any) => {
                                    return (

                                        <Card shadow="sm" key={item.id} isPressable className="flex border-white border-1 flex-row items-center p-[10px] py-[0px]" onPress={() => {
                                            addProduct(item)
                                        }}>

                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                alt={item.name}
                                                className="object-cover w-[50px] h-[50px]"
                                                src={item.img}
                                            />

                                            <CardFooter className="flex flex-col items-start">
                                                <b className="truncate whitespace-nowrap overflow-hidden max-w-xs">{item.name}</b>
                                                <p className="textprange text-default-500">{item.price} ₽</p>
                                            </CardFooter>

                                        </Card>

                                    )
                                })}
                            </div>
                        </ModalBody>


                    </>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Settings