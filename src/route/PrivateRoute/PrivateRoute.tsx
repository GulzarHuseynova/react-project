import { Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import { privateRoutes } from "./PrivateRoutes";

export default function PrivateRoutes() {

    return (
        <Routes>
            <>
                {privateRoutes.map((route) => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Layout>
                                    {route.element}
                                </Layout>
                            }
                        />
                    )
                })}
            </>
        </Routes>
    )
}