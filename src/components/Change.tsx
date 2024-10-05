import { Card, CardBody, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, useDisclosure } from "@nextui-org/react"
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import TovarSelect from "./SelectTovars";
import { Tovars } from "./Shop";



export type Product = {
    id: number
    name: string;
    img: string;
    price: number;
    tovars?: any
}


const Change = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [products, setProducts] = useState<Product[]>([]);
    const [ujest, setUjest] = useState<boolean>(false);
    const [pid, setPid] = useState<number>(0);
    const [itogo, setItogo] = useState<number>(0);
    const [selItems, setSelItems] = useState<any>([]);
    const [tovars] = useState<Tovars[]>(JSON.parse(localStorage.getItem("tovars") || "[]"))



    function removeDuplicatesById(array: any) {
        const uniqueIds = new Set();
        return array.filter((item: any) => {
            if (!uniqueIds.has(item.id)) {
                uniqueIds.add(item.id);
                return true;
            }
            return false;
        });
    }


    function selDATA(data: any) {
        // Начинаем с пустого массива
        let newSelItems: any = [];

        data = data.split(",");

        if (data[0] !== "") {
            for (let i of data) {
                tovars.forEach((pr: any) => {
                

                    if (parseFloat(pr.id) === parseFloat(i)) {
                        // Добавляем элемент только если он совпадает
                        newSelItems.push(pr);
                    }
                });
            }

            // Удаляем дубликаты по id
            newSelItems = removeDuplicatesById(newSelItems);

            // Обновляем состояние один раз
            setSelItems(newSelItems);
        } else {
            setSelItems([]);
        }

  
        setItogo(newSelItems.reduce((sum: any, item: any) => sum + item.price, 0))
    }



    const [pname, setPname] = useState<string>('')
    const [purl, setPurl] = useState<string>('')

    function updateProducts() {
        let products = localStorage.getItem('products') || '[]';
        setProducts(JSON.parse(products))
    }

    function validate(str: string) {
        if (str.trim().length > 0) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (!isOpen) {
            setPname('')
            setPurl('')
            setUjest(false)
            setPid(0)
        }
    }, [isOpen])

 

    function subitItem() {
        if (validate(pname) && validate(purl) && selItems.length > 0) {


            let products = JSON.parse(localStorage.getItem('products') || "[]")

            let data = {
                id: ujest ? pid : products.length + 1,
                name: pname,
                price: itogo,
                img: purl,
                tovars: selItems
            }

            if (ujest) {
                products = products.map((product: Product) => product.id === pid ? data : product)
            } else {
                products.push(data)
            }



            localStorage.setItem('products', JSON.stringify(products))
            onOpenChange()
            updateProducts()

            setPname('')
            setPurl('')
            setUjest(false)
            setPid(0)
            setItogo(0)
        }
    }



    useEffect(() => {
        updateProducts()
    }, [])


    function editable(item: Product) {
        setUjest(true)
        setPid(item.id)
        setPname(item.name)
        setPurl(item.img)
        setSelItems(item.tovars)
        setItogo(item.tovars.reduce((sum: any, item: any) => sum + item.price, 0))
        onOpen()

    }






    return (

        <>
            <div className="w-full flex flex-col items-center">


                <div className="max-w-[500px] px-[20px] w-full mt-[40px] flex gap-[10px]">
                    <Link to={'/'}>
                        <Button isIconOnly variant="bordered" color="primary">
                            <IoMdArrowRoundBack size={20} />
                        </Button>
                    </Link>

                    <Button

                        onClick={() => {
                            onOpen()
                        }}
                        className="w-full py-[10px]" color="primary" endContent={<IoMdAdd className="pt-[5px] stb" size={25} />}>
                        <p className="text-[17px] text-black">Добавить</p>
                    </Button>
                </div>


                <div className="w-full grid grid-cols-3 gap-[20px] mt-[40px] max-w-[500px] px-[20px]">
                    {products.map((item: any) => {
                        return (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Card shadow="sm" key={item.id} isPressable onPress={() => console.log("item pressed")}>
                                        <CardBody className="overflow-visible p-0">
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={item.name}
                                                className="w-full object-cover h-[140px]"
                                                src={item.img}
                                            />
                                        </CardBody>
                                        <CardFooter className="flex flex-col items-start">
                                            <b className="truncate whitespace-nowrap overflow-hidden max-w-xs">{item.name}</b>
                                            <p className="textprange text-default-500">{item.price} ₽</p>
                                        </CardFooter>
                                    </Card>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Action event example"
                                    onAction={(key) => {
                                        if (key == 'delete') {
                                            let prs = localStorage.getItem('products') || "[]"
                                            let data = JSON.parse(prs)
                                            prs = data.filter((product: any) => product.id !== item.id);

                                            localStorage.setItem('products', JSON.stringify(prs));
                                            updateProducts();
                                        }


                                        if (key == 'edit') {
                                            editable(item)
                                            setPid(item.id)
                                        }
                                    }
                                    }
                                >
                                    <DropdownItem key="edit">Изменить</DropdownItem>
                                    <DropdownItem key="delete"  >
                                        <p className="text-red-400">Удалить продукт</p>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )
                    })}
                </div>

            </div>



            <Modal placement="center" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Добавить продукт</ModalHeader>


                            <ModalBody>

                                <Input type="text"
                                    value={pname}
                                    onChange={(e) => {
                                        setPname(e.target.value)
                                    }}
                                    label="Че как называется?" size="lg" />






                                <p>Обойдется за {itogo}₽</p>
                                <TovarSelect sels={ujest ? selItems.map((item: any) => item.id) : null} selDATA={selDATA} />








                                <Input
                                    value={purl}
                                    onChange={(e) => {
                                        setPurl(e.target.value)
                                    }}
                                    type="text" label="Фотка URL" size="lg" />

                            </ModalBody>


                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Передумал
                                </Button>
                                <Button onClick={() => {
                                    subitItem()
                                }} color="primary" >
                                    ммм вкусно
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default Change


