import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";



type Props = {
    isOpen: boolean;
    onOpen: any;
    onOpenChange: any;
    updateProducts: any;
}



const AddItem = (props: Props) => {

    const [pname, setPname] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [purl, setPurl] = useState<string>('')

    

    function validate(str: string) {
        if (str.trim().length > 0) {
            return true
        } else {
            return false
        }
    }

    function subitItem() {
        if (validate(pname) && validate(price) && validate(purl)) {


            let products = JSON.parse(localStorage.getItem('products') || "[]")

            let data = {
                id: products.length + 1,
                name: pname,
                price: parseFloat(price),
                img: purl
            }

            products.push(data)

            console.log(data);
            localStorage.setItem('products', JSON.stringify(products))
            props.onOpenChange(false)
            props.updateProducts()

            setPname('')
            setPrice('')
            setPurl('')

        }
    }


    return (
        <>
            <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
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
                                    ммм вкусно
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddItem