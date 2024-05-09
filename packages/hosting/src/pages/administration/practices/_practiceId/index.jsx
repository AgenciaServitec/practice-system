import React from "react"
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {Controller, useForm} from "react-hook-form";
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    InputPassword,
    Select,
    TextArea, TimePicker,
    Title
} from "../../../../components";
import {Roles} from "../../../../data-list";
import {capitalize} from "lodash";
import {yupResolver} from "@hookform/resolvers/yup";
import {useFormUtils} from "../../../../hooks";

export const PracticeIntegration = () => {

    const {
        formState: {errors},
        handleSubmit,
        control,
        reset,
        watch
    } = useForm();

    const {required, error} = useFormUtils({errors})

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Title level={3}>Registro de Prácticas Pre-Profesionales</Title>
            </Col>
            <Col span={24}>
                <Form>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <Input
                                        label="Nombre del módulo"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={24}>
                            <Controller
                                name="task"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <TextArea
                                        label="Tarea desarrollada"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={24} md={4}>
                            <Controller
                                name="hours"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <Input
                                        label="Horas"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={24} md={4}>
                            <Controller
                                name="startDate"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <DatePicker
                                        label="Fecha de Inicio"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col><Col span={24} md={4}>
                            <Controller
                                name="endDate"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <DatePicker
                                        label="Fecha de Término"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={24} md={4}>
                            <Controller
                                name="supervisor"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <Input
                                        label="Supervisor"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={24} md={4}>
                            <Controller
                                name="entryTime"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <TimePicker
                                        label="Hora de entrada"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={24} md={4}>
                            <Controller
                                name="departureTime"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value, name } }) => (
                                    <TimePicker
                                        label="Hora de salida"
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row justify="end" gutter={[16, 16]}>
                        <Col xs={24} sm={6} md={4}>
                            <Button
                                type="default"
                                size="large"
                                block
                            >
                                Cancelar
                            </Button>
                        </Col>
                        <Col xs={24} sm={6} md={4}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                            >
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}