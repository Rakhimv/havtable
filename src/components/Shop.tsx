import { Card, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, useDisclosure } from "@nextui-org/react"
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";



export type Tovars = {
    id: number
    name: string;
    img: string;
    price: number;
}


const Shop = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [tovars, setTovars] = useState<Tovars[]>([]);
    const [ujest, setUjest] = useState<boolean>(false);
    const [pid, setPid] = useState<number>(0);
    const [itogo, setItogo] = useState<number>(0);

    const [pname, setPname] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [purl, setPurl] = useState<string>('')

    function updateTovars() {
        let tovars = localStorage.getItem('tovars') || '[]';
        setTovars(JSON.parse(tovars))
        setItogo(0)

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
            setPrice('')
            setPurl('')
            setUjest(false)
            setPid(0)
        }
    }, [isOpen])


    useEffect(() => {
        setItogo(0)
        let it = 0
        if (tovars.length > 0) {
            for (let item of tovars) {
                it = it + item.price
            }
        }
        setItogo(it)
    }, [tovars])



    function subitItem() {
        if (validate(pname) && validate(price) && validate(purl)) {


            let tovars = JSON.parse(localStorage.getItem('tovars') || "[]")

            let data = {
                id: ujest ? pid : tovars.length + 1,
                name: pname,
                price: parseFloat(price),
                img: purl
            }

            if (ujest) {
                tovars = tovars.map((product: Tovars) => product.id === pid ? data : product)
            } else {
                tovars.push(data)
            }


            console.log(data);
            localStorage.setItem('tovars', JSON.stringify(tovars))
            onOpenChange()
            updateTovars()

            setPname('')
            setPrice('')
            setPurl('')
            setUjest(false)
            setPid(0)
        }
    }



    useEffect(() => {
        updateTovars()
    }, [])


    function editable(item: Tovars) {
        setUjest(true)
        setPid(item.id)
        setPname(item.name)
        setPurl(item.img)
        setPrice(String(item.price))
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

                <div className="max-w-[500px]  px-[20px] w-full mt-[20px] flex justify-center">
                    <div className="w-full border-1 p-[20px] py-[10px] rounded-lg flex justify-center border-white">
                        Итого: <span className="text-green-500 ml-2 font-bold font-mono">
                            {itogo} ₽
                        </span> 
                    </div>
                </div>


                <div className="w-full flex flex-col gap-[10px] mt-[40px] max-w-[500px] px-[20px]">
                    {tovars.map((item: any) => {
                        return (





                            <Dropdown>
                                <DropdownTrigger>

                                    <Card shadow="sm" isPressable key={item.id} className="flex flex-row items-center p-[10px] w-full py-[0px]" >

                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            alt={item.name}
                                            className="object-cover w-[50px] h-[50px]"
                                            src={item.img}
                                        />

                                        <CardFooter className="w-full flex justify-between items-center">
                                            <div className="flex flex-col items-start">
                                                <b className="truncate whitespace-nowrap overflow-hidden max-w-xs">{item.name}</b>
                                                <p className="textprange text-default-500">{item.price} ₽</p>
                                            </div>


                                        </CardFooter>
                                    </Card>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Action event example"
                                    onAction={(key) => {
                                        if (key == 'delete') {
                                            let prs = localStorage.getItem('tovars') || "[]"
                                            let data = JSON.parse(prs)
                                            prs = data.filter((product: any) => product.id !== item.id);

                                            localStorage.setItem('tovars', JSON.stringify(prs));
                                            updateTovars();
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



            <Modal  placement="center" backdrop="blur"  isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Добавить товар с списокчек</ModalHeader>


                            <ModalBody>

                                <Input type="text"
                                    value={pname}
                                    onChange={(e) => {
                                        setPname(e.target.value)
                                    }}
                                    label="Че как называется?" size="lg" />
                                <Input
                                    type="number"
                                    label="Цена?"
                                    size="lg"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">₽</span>
                                        </div>
                                    }
                                />
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
                                    минус бабос
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default Shop


