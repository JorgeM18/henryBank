// // import React from 'react'
// // import { StyleSheet, Text, View } from 'react-native'

// // const Faq = () => {
// //     return (
// //         <View>
// //             <Text></Text>
// //         </View>
// //     )
// // }

// // export default Faq

// // const styles = StyleSheet.create({})

// import React, { Component, Fragment } from "react";
// import Faq from "react-faq-component";
// import './Faq.css'
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// const data = {
//     rows: [
//         {
//             title:
//                 "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
//             content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
//             ultricies metus at, consequat velit.
//            `,
//         },
//         {
//             title: "Nunc maximus, magna at ultricies elementum",
//             content:
//                 "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
//         },
//         {
//             title: "Can I use html as content",
//             content: `Yes, here is an example of a <a href="https://binodswain.github.io/react-faq-component/">link</a>`,
//         },
//         {
//             title: "What is the package version",
//             content: "v1.0.0",
//         },
//         {
//             title: "How about <Link/> to other page (react-router-dom)",
//             content: (
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/">Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/about">About</Link>
//                         </li>
//                         <li>
//                             <Link to="/users">Users</Link>
//                         </li>
//                     </ul>
//                 </nav>
//             ),
//         },
//     ],
// };

// const styles = {
//     bgColor: 'black',
//     titleTextColor: "white",
//     titleTextColor: "blue",
//     rowTitleColor: "blue",
//     rowContentColor: 'grey',
//     timingFunc: "linear",
// };

// const config = {
//     animate: true,
//     arrowIcon: "V",
//     tabFocus: true,
// };

// export default class App extends Component {
//     render() {
//         return (
//             <Fragment>
//                 <Router>
//                     <div>
//                         <Switch>
//                             <Route path="/about">
//                                 <About />
//                             </Route>
//                             <Route path="/users">
//                                 <Users />
//                             </Route>
//                             <Route path="/">
//                                 <Home />
//                             </Route>
//                         </Switch>
//                     </div>
//                 </Router>
//             </Fragment>
//         );
//     }
// }

// function Home() {
//     return (
//         <div style={{bgColor: 'black'}}>
//             <h2>FAQ</h2>
//             <div>
//                 <Faq
//                     data={data}
//                     styles={{
//                         bgColor: "white",
//                         titleTextColor: "#48482a",
//                         rowTitleColor: "#000000",
//                         rowTitleTextSize: "large",
//                         rowContentColor: "#48484a",
//                         rowContentTextSize: "16px",
//                         rowContentPaddingTop: "10px",
//                         rowContentPaddingBottom: "10px",
//                         rowContentPaddingLeft: "50px",
//                         rowContentPaddingRight: "150px",
//                         arrowColor: "black",
//                         transitionDuration: "1s",
//                         timingFunc: "linear",
//                     }}
//                 />
//                 <br />     
//             </div>
//         </div>
//     );
// }

// function About() {
//     return <h2>About</h2>;
// }

// function Users() {
//     return <h2>Users</h2>;
// }