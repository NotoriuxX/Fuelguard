import React, { useState } from 'react';

const Profile = () => {
  // Estado para manejar si los campos son editables o no
  const [isEditable, setIsEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Imagen de perfil y predeterminada
  const defaultImage = '/images/default-profile.jpg'; // Ruta a la imagen predeterminada
  const [profileImage, setProfileImage] = useState('/images/user2.jpg'); // Imagen actual de perfil

  // Estado de hover sobre la imagen de perfil
  const [isHovering, setIsHovering] = useState(false);

  // Estado de los datos del perfil (podrías obtener esto de una API)
  const [profileData, setProfileData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    numero: '+569 1234 5678',
    cargo: 'Desarrollador',
    tipoUsuario: 'Administrador',
  });

  // Función para cambiar la imagen de perfil
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Actualiza la imagen de perfil
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para eliminar la imagen de perfil (volver a la imagen predeterminada)
  const handleImageRemove = () => {
    setProfileImage(defaultImage);
  };

  // Función para validar la contraseña
  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
      );
      return false;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  // Función para manejar la edición del perfil
  const handleEdit = (e) => {
    e.preventDefault();
    if (!isEditable) {
      if (currentPassword === 'password123') {
        setIsEditable(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Contraseña actual incorrecta.');
      }
    } else if (newPassword && validatePassword()) {
      console.log('Contraseña actualizada:', newPassword);
      setIsEditable(false);
      setNewPassword('');
      setConfirmPassword('');
    } else if (!newPassword) {
      console.log('Perfil actualizado:', profileData);
      setIsEditable(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        
        {/* Centramos el título "Perfil de Usuario" */}
        <h2 className="text-2xl font-bold mb-4 text-center">Perfil de Usuario</h2>

        {/* Imagen de perfil */}
        <div
          className="relative w-40 h-40 mb-6 mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-gray-800"
          />
          {/* Efecto hover con transición suave */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center 
              transition-opacity duration-500 ease-in-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="text-white text-center">
              <p
                className="cursor-pointer mb-2 transition-colors duration-300"
                onClick={() => document.getElementById('imageInput').click()}
              >
                Cambiar Imagen
              </p>
              <p className="cursor-pointer transition-colors duration-300" onClick={handleImageRemove}>
                Eliminar Imagen
              </p>
            </div>
          </div>
          <input
            id="imageInput"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {/* Formulario de perfil */}
        <form onSubmit={handleEdit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={profileData.nombre}
              readOnly={!isEditable}
              onChange={(e) =>
                setProfileData({ ...profileData, nombre: e.target.value })
              }
            />
          </div>
          {/* Apellido */}
          <div className="mb-4">
            <label className="block text-gray-700">Apellido:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={profileData.apellido}
              readOnly={!isEditable}
              onChange={(e) =>
                setProfileData({ ...profileData, apellido: e.target.value })
              }
            />
          </div>
          {/* Correo */}
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={profileData.email}
              readOnly={!isEditable}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>
          {/* Número */}
          <div className="mb-4">
            <label className="block text-gray-700">Número de Teléfono:</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={profileData.numero}
              readOnly={!isEditable}
              onChange={(e) =>
                setProfileData({ ...profileData, numero: e.target.value })
              }
            />
          </div>
          {/* Cargo */}
          <div className="mb-4">
            <label className="block text-gray-700">Cargo:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={profileData.cargo}
              readOnly
            />
          </div>
          {/* Tipo de Usuario */}
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Usuario:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={profileData.tipoUsuario}
              readOnly
            />
          </div>

          {/* Si está en modo edición, permitir cambiar contraseña */}
          {isEditable && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Nueva Contraseña:</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirmar Contraseña:</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Contraseña actual para desbloquear edición */}
          {!isEditable && (
            <div className="mb-4">
              <label className="block text-gray-700">Contraseña Actual:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          )}

          {/* Mensaje de error */}
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          {/* Botón de guardar cambios */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isEditable ? 'Guardar Cambios' : 'Editar Perfil'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
