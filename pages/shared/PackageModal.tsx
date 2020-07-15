import React from 'react';
import { Modal, Button } from 'antd';
import { Cart } from '../../utils/common';

const PackageModal = ({ show, packageItem, onClose }: { show: boolean, packageItem?: Cart[], onClose: Function }) => {
  return (
    <Modal
      className='package-modal'
      title={`Contenido del paquete de ${packageItem ? packageItem[0].product.business.name : 'desconocido'}`}
      centered
      visible={show}
      onOk={() => onClose()}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          Cerrar
        </Button>,
      ]}
    >
      <table className='package-modal__table'>
        <thead>
          <tr>
            <th></th>
            <th className='text-left'>Producto</th>
            <th className='text-center'>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {
            packageItem && packageItem.map((item: Cart) => <tr>
              <td style={{ width: '20%' }}>
                <div className='package-modal__table__image' style={{
                  backgroundImage: `url("${item.product.images.length > 0 ? `${process.env.serverUrl}${item.product.images[0].image}` : '/assets/default.png'}")`
                }}>

                </div>
              </td>
              <td>{item.product.name} {item.variant.name}</td>
              <td>{item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}</td>
            </tr>)
          }
        </tbody>
      </table>
    </Modal>
  )
}

export default PackageModal;