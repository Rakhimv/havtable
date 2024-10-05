// import { useEffect, useState } from "react"

// const Test = () => {

//     const [n, setN] = useState<any>(5)
//     const [from, setFrom] = useState<any>(1)
//     const [to, setTo] = useState<any>(3)

//     const [n1, setN1] = useState<any>(n)
//     const [n2, setN2] = useState<any>(0)
//     const [n3, setN3] = useState<any>(0)




//     function getRandomHexColor() {
//         const randomNumber = Math.floor(Math.random() * 16777215);
//         const hexColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
//         return hexColor;
//     }

//     function han(n: number, from: number, to: number) {
//         if (n > 1) {
//             let tmp = 6 - from - to;
//             han(n - 1, from, tmp);
//             han(1, from, to);
//             han(n - 1, tmp, to);

//         } else {
//             console.log(from + " -> " + to)
//         }
//     }


//     useEffect(() => {





//         han(n, from, to);

//     }, [])




//     return (
//         <div className="grid grid-cols-3 w-full">

//             <div>
//                 {Array.from({ length: n1 }, (_, index) => (
//                     <div key={index}>Элемент {index + 1}</div>
//                 ))}
//             </div>

//             <div>
//                 {Array.from({ length: n2 }, (_, index) => (
//                     <div key={index}>Элемент {index + 1}</div>
//                 ))}

//             </div>

//             <div>
//                 {Array.from({ length: n3 }, (_, index) => (
//                     <div key={index}>Элемент {index + 1}</div>
//                 ))}
//             </div>

//         </div>
//     )
// }

// export default Test