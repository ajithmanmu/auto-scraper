// import {
//     StyleSheet,
//   } from "@react-pdf/renderer";

//   const styles = StyleSheet.create({
//     page: {
//       backgroundColor: "#ffffff"
//     },
//     header: {
//         margin: 10,
//         padding: 10,
//         // flexGrow: 1
//     },
//     header__text: {
//         fontSize: 15
//     },
//     container: {
//         margin: 10,
//         padding: 10,
//         // flexGrow: 1,
//         flexDirection: 'row',
//         alignContent: 'center',
//         justifyContent: 'center'
//     },
//     image: {
//         height: 200,
//         width: 150
//     },
//     overviewCard: {
//         flexDirection: 'column',
//         alignContent: 'center',
//         justifyContent: 'center'
//     },
//     text__name : {
//         fontSize: 12
//     },
//     text__type :{
//         fontSize: 10
//     }
//   });
  
const Spec = ({spec}:any) => {
    return (
        <div className="md:container md:mx-auto">
            <div className="flex flex-row ...">
                <div className="w-80 h-56 object-fit" style={{backgroundImage: `url(${spec.image})`, backgroundSize:'cover'}} />
                <div className="flex items-center justify-center m-10 flex-col">
                    <div className="text-gray-900 font-bold text-xl mb-2">{spec.name} - {spec.variant}</div>
                    <div className="text-gray-900 font-bold text-xl mb-2 self-start">{spec.type}</div>
                </div>
            </div>
        </div>
    )
};

export default Spec;

