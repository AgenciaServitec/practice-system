<?php include 'template/header.php' ?>

<style>
    body {
        background-image: url('img/gilda.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    .card{
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>

<?php
    include_once "model/conexion.php";
    $sentencia = $bd -> query("select * from estudiante");
    $estudiante = $sentencia->fetchAll(PDO::FETCH_OBJ);
    //print_r($estudiante);
?>

<div class="container-fluid content-container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-7 mt-5">
            <!-- inicio alerta -->
            <?php 
                if(isset($_GET['mensaje']) and $_GET['mensaje'] == 'falta'){
            ?>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Rellena todos los campos.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php 
                }
            ?>


            <?php 
                if(isset($_GET['mensaje']) and $_GET['mensaje'] == 'registrado'){
            ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Registrado!</strong> Se agregaron los datos.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php 
                }
            ?>   
            
            

            <?php 
                if(isset($_GET['mensaje']) and $_GET['mensaje'] == 'error'){
            ?>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Vuelve a intentar.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php 
                }
            ?>   



            <?php 
                if(isset($_GET['mensaje']) and $_GET['mensaje'] == 'editado'){
            ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Cambiado!</strong> Los datos fueron actualizados.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php 
                }
            ?> 


            <?php 
                if(isset($_GET['mensaje']) and $_GET['mensaje'] == 'eliminado'){
            ?>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Eliminado!</strong> Los datos fueron borrados.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php 
                }
            ?> 

            <!-- fin alerta -->
            <div class="card">
                <div class="card-header">
                    Lista de personas
                </div>
                <div class="p-4">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">DNI</th>
                                <th scope="col">Nombres Completos</th>
                                <th scope="col">Código de Matrícula</th>
                                <th scope="col">Turno</th>
                                <th scope="col">Semestre</th>
                                <th scope="col" colspan="3">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <?php 
                                $count = 0;
                                foreach($estudiante as $dato){                               

                            ?>
                                
                            <tr>
                                <!-- <td scope="row"><?php echo $dato->registro; ?></td> -->
                                <td><?php echo $dato->dni; ?></td>
                                <td><?php echo $dato->nombres.' '.$dato->apellido_paterno.' '.$dato->apellido_materno; ?></td>
                                <td><?php echo $dato->cod_matrícula; ?></td>
                                <td><?php echo $dato->turno; ?></td>
                                <td><?php echo $dato->semestre; ?></td>

                                <td><a class="text-success" href="editar.php?registro=<?php echo $dato->registro; ?>"><i class="bi bi-pencil-square"></i></a></td>
                                <td><a onclick="return confirm('Estas seguro de eliminar?');" class="text-danger" href="eliminar.php?registro=<?php echo $dato -> registro; ?>"><i class="bi bi-trash"></i></a></td>
                                <td><a class="text-primary" href="generar_pdf.php?registro=<?php echo $dato->registro ; ?>"><i class="bi bi-file-pdf"></i></a></td>
                            </tr>

                            <?php 
                                }
                            ?>

                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
        <div class="mb-3 d-flex justify-content-center mt-3">

                <a href="nuevo.php" target="_blank" class="btn btn-info">Registrar nuevo Usuario</a>
        </div>
                
    </div>
</div>

<?php include 'template/footer.php' ?>