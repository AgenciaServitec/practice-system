import React from "react";
import {Space, Table, Tag} from "antd";
import {Acl, IconAction} from "../../../components";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {Roles} from "../../../data-list";

export const PracticeTable = ({ practices, onEditPractice, onConfirmRemovePractice }) => {
    const findRole = (roleCode) => Roles.find((role) => role.code === roleCode);

    const columns = [
        {
            title: "Fecha de Creación",
            dataIndex: "createAt",
            key: "createAt",
            render: (_, practice) =>
                moment(practice?.createAt.toDate()).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "Nombre del Módulo",
            dataIndex: "roleCode",
            key: "roleCode",
            render: (_, practice) => findRole(practice?.roleCode)?.name || "",
        },
        {
            title: "N° de Módulo",
            dataIndex: "dni",
            key: "dni",
            render: (_, practice) => practice?.dni || "",
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            render: (_, practice) => (
                <Space>
                    <span>
                        <Tag color="yellow">{practice?.status}</Tag>
                    </span>
                </Space>
            ),
        },
        {
            title: "Acciones",
            key: "actions",
            render: (_, practice) => (
                <Space>
                    <Acl name="/practices/:practiceId">
                        <IconAction
                            tooltipTitle="Editar"
                            icon={faEdit}
                            onClick={() => onEditPractice(practice)}
                        />
                    </Acl>
                    <Acl name="/practices#delete">
                        <IconAction
                            tooltipTitle="Eliminar"
                            styled={{ color: (theme) => theme.colors.error }}
                            icon={faTrash}
                            onClick={() => onConfirmRemovePractice(practice)}
                        />
                    </Acl>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={practices}
            pagination={false}
            scroll={{ x: "max-content" }}
        />
    );
};
``;
