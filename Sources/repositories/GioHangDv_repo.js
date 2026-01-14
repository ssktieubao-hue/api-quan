import { pool } from '../config/Database/db.js'

export const gioHangDv_Repo = {

  add_Repo: async ({ MaKH, MaDV, SoLuong }) => {
    const db = await pool
    
    // Kiểm tra nếu item đã tồn tại
    const [existing] = await db.query(`
      SELECT SoLuong FROM GIOHANG_DV
      WHERE MaKH = ? AND MaDV = ?
    `, [MaKH, MaDV])
    
    if (existing.length > 0) {
      // Item đã tồn tại, cập nhật số lượng
      const newQty = existing[0].SoLuong + SoLuong
      
      if (newQty <= 0) {
        // Nếu số lượng <= 0, xóa item khỏi giỏ hàng
        await db.query(`
          DELETE FROM GIOHANG_DV
          WHERE MaKH = ? AND MaDV = ?
        `, [MaKH, MaDV])
      } else {
        // Cập nhật số lượng (đảm bảo > 0)
        await db.query(`
          UPDATE GIOHANG_DV
          SET SoLuong = ?
          WHERE MaKH = ? AND MaDV = ?
        `, [newQty, MaKH, MaDV])
      }
    } else {
      // Item chưa tồn tại, chỉ thêm nếu SoLuong > 0
      if (SoLuong > 0) {
        await db.query(`
          INSERT INTO GIOHANG_DV (MaKH, MaDV, SoLuong)
          VALUES (?, ?, ?)
        `, [MaKH, MaDV, SoLuong])
      }
    }
  },

  getByUser_Repo: async (MaKH) => {
    const db = await pool
    const [rows] = await db.query(`
      SELECT g.*, d.TenDV, d.Gia, d.HinhAnh
      FROM GIOHANG_DV g
      JOIN DICHVU d ON g.MaDV = d.MaDV
      WHERE g.MaKH = ?
    `, [MaKH])
    return rows
  },

  updateQty_Repo: async (MaKH, MaDV, SoLuong) => {
    const db = await pool
    await db.query(`
      UPDATE GIOHANG_DV
      SET SoLuong = ?
      WHERE MaKH = ? AND MaDV = ?
    `, [SoLuong, MaKH, MaDV])
  },

  removeOne_Repo: async (MaKH, MaDV) => {
    const db = await pool
    await db.query(`
      DELETE FROM GIOHANG_DV
      WHERE MaKH = ? AND MaDV = ?
    `, [MaKH, MaDV])
  },


  clear_Repo: async (MaKH) => {
    const db = await pool
    await db.query(`
      DELETE FROM GIOHANG_DV 
      WHERE MaKH = ?
    `, [MaKH])
  }
}
