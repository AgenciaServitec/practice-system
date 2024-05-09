import React from "react"
import Row from "antd/lib/row";
import {Acl, AddButton, modalConfirm, Title} from "../../../components";
import Col from "antd/lib/col";
import {Divider} from "antd";
import {UsersTable} from "../users/UserTable";
import {useGlobalData} from "../../../providers";
import {useNavigate} from "react-router";
import {updatePractice} from "../../../firebase/collections/practices";
import {useDefaultFirestoreProps} from "../../../hooks";
import {PracticeTable} from "./PracticeTable";

export const Practices = () => {
    const navigate = useNavigate()
    const {practices} = useGlobalData()
    const {assignDeleteProps} = useDefaultFirestoreProps()

    const navigateTo = (practiceId) => {
        const url = `/practice/${practiceId}`
        navigate(url);
    }

    const onAddPractice = () => navigate("new");

    const onEditPractice = (practice) => navigateTo(practice.id);

    const onDeletePractice = async (practice) => {
        try{
            await updatePractice(practice.id, assignDeleteProps({isDeleted: true}))
        }catch(e){
            console.error("ErrorDeletePractice: ", e)
        }
    };

    const onConfirmRemovePractice = async (practice) => modalConfirm({
        content: "El documento se eliminará",
        onOk: async () => {
            await onDeletePractice(practice);
        },
    });

    return <Acl redirect name="/practices">
        <Row gutter={[16, 16]}>
            <Acl name="/practices/new">
                <>
                    <Col span={24}>
                        <AddButton onClick={onAddPractice} title="Práctica" margin="0" />
                    </Col>
                    <Divider />
                </>
            </Acl>
            <Col span={24}>
                <Title level={3}>Prácticas</Title>
            </Col>
            <Col span={24}>
                <PracticeTable
                    users={practices}
                    onEditUser={onEditPractice}
                    onConfirmRemoveUser={onConfirmRemovePractice}
                />
            </Col>
        </Row>
    </Acl>
}