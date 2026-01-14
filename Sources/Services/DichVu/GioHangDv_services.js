import { gioHangDv_Repo } from '../../repositories/GioHangDv_repo.js'

export const gioHangDv_Services = {
  add_Service: async ({ MaKH, MaDV, SoLuong }) => {
    // Validation: SoLuong phải là số hợp lệ
    if (typeof SoLuong !== 'number' || isNaN(SoLuong)) {
      throw new Error('Số lượng không hợp lệ')
    }
    
    // Logic xử lý số lượng âm đã được xử lý trong repository
    // Nếu SoLuong < 0 và tổng số lượng <= 0, item sẽ bị xóa
    return await gioHangDv_Repo.add_Repo({ MaKH, MaDV, SoLuong })
  },
  
  getByUser_Service: gioHangDv_Repo.getByUser_Repo,
  clearByUser_Service: gioHangDv_Repo.clear_Repo,
  removeOne_Service: gioHangDv_Repo.removeOne_Repo,
  
  updateQty_Service: async (MaKH, MaDV, SoLuong) => {
    // Validation: SoLuong phải là số dương
    if (typeof SoLuong !== 'number' || isNaN(SoLuong) || SoLuong < 0) {
      throw new Error('Số lượng phải là số dương')
    }
    
    // Nếu số lượng = 0, xóa item thay vì cập nhật
    if (SoLuong === 0) {
      return await gioHangDv_Repo.removeOne_Repo(MaKH, MaDV)
    }
    
    return await gioHangDv_Repo.updateQty_Repo(MaKH, MaDV, SoLuong)
  }
}
