import {Placeholder} from "react-bootstrap";

export default function HomeSkeleton() {
    return (
        <>
            <tr>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
            </tr>
            <tr>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={9}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={8}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={9}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={4}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
            </tr>
            <tr>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={8}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={5}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={8}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={7}/>
                </Placeholder>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
            </tr>
        </>
    )
}