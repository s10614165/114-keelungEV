import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const GAS_BASE_URL =
  "https://script.google.com/macros/s/AKfycbwy9t7Wt312t9I5l8MqeOhwXZM8BSx4bYm0qaz65PDn64XE9FlvWRD5PnagPISZMdZxYQ/exec";

const useGoogleSheetQuery = (baseUrl = GAS_BASE_URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");



  /**
   * 將檔案轉換為 Base64 格式
   * @param {File} file - 要轉換的檔案
   * @returns {Promise} 回傳包含檔名、MIME類型、Base64資料的物件
   */
  const readFileAsBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result.split(',')[1];
        resolve({
          fileName: file.name,
          mimeType: file.type,
          fileData: base64Data,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  /**
   * 處理 Antd Upload 組件的檔案資料並轉換為 Base64
   * @param {Object} formData - 包含 Antd Upload 檔案的表單資料
   * @param {Array} fileFields - 需要處理的檔案欄位名稱陣列
   * @returns {Promise<Array>} 回傳檔案負載陣列
   */
  const processAntdUploadFiles = useCallback(async (formData, fileFields = ['companyRegistration', 'businessRegistration']) => {
    try {
      const filePayloads = [];
      
      for (const fieldName of fileFields) {
        const uploadData = formData[fieldName];
        
        // 檢查是否有檔案資料
        if (uploadData?.fileList?.[0]?.originFileObj) {
          const file = uploadData.fileList[0].originFileObj;
          const payload = await readFileAsBase64(file);
          
          filePayloads.push({
            id: fieldName,
            fileName: file.name || uploadData.fileList[0].name,
            mimeType: file.type || uploadData.fileList[0].type,
            fileData: payload.fileData,
            // 保留原始檔案資訊
            originalData: {
              uid: uploadData.fileList[0].uid,
              size: uploadData.fileList[0].size,
              lastModified: uploadData.fileList[0].lastModified
            }
          });
          
        } else {
          // 沒有檔案時建立空的負載
          filePayloads.push({
            id: fieldName,
            fileName: null,
            mimeType: null,
            fileData: null
          });
        }
      }
      
      return filePayloads;
    } catch (error) {
      console.error("處理 Antd Upload 檔案失敗:", error);
      throw new Error("Antd Upload 檔案轉換為 Base64 失敗");
    }
  }, [readFileAsBase64]);

  // ==========================================
  // 🔹 Base64 方式提交表單資料
  // ==========================================

  /**
   * 使用 Base64 方式提交表單資料到 Google Sheets (一併發送)
   * @param {Object} formData - 表單資料
   * @param {Array} filePayloads - Base64 檔案負載陣列
   * @param {string} action - 動作類型
   * @returns {Promise} 提交結果
   */
  const submitFormWithBase64Files = useCallback(
    async (formData, filePayloads, action = "getSubsidy") => {
      try {

        // 將檔案資料直接嵌入表單資料中
        const finalPayload = {
          action: action,
          ...formData,
          files: filePayloads, // 包含所有檔案的 Base64 資料
          submitTime: new Date().toISOString(),
        };


        const response = await axios.post(baseUrl, finalPayload, {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "text/plain",
      //       'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Max-Age': '3600'
          },
           mode: "no-cors"
        });

        const result = response.data;

        if (result.status === "200" || result.trim?.().toLowerCase() === 'success') {
          setData(result.data || result);
          setStatus("200");
        } else {
          setData([]);
          setStatus(result.status || "error");
          console.warn("完整表單資料提交警告:", result);
        }

        return result;
      } catch (err) {
        console.error("提交完整表單資料錯誤:", err);
        setError(err);
        setData(null);
        throw err;
      }
    },
    [baseUrl]
  );

 

  // ==========================================
  // 🔹 主要提交函數 (支援兩種檔案處理方式)
  // ==========================================

  // ==========================================
  // 🔹 主要提交函數
  // ==========================================

  // 主要的 refetch 函數 (智能檔案處理)
  const refetch = useCallback(
    async (queryParams = {}, actions = "getSubsidy") => {
      setLoading(true);
      setError(null);

      try {

        
        // 處理 Antd Upload 檔案
        const filePayloads = await processAntdUploadFiles(queryParams, ['companyRegistration', 'businessRegistration']);
        
        // 🎯 使用解構賦值移除檔案屬性，不修改原物件
        const { companyRegistration, businessRegistration, ...cleanFormData } = queryParams;
        
        // 一併提交表單資料和檔案
        const result = await submitFormWithBase64Files(cleanFormData, filePayloads, actions);
        return result;

      } catch (err) {
        setError(err);
        setData(null);
        console.error("提交流程錯誤:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [processAntdUploadFiles, submitFormWithBase64Files]
  );

  /**
   * 使用 Base64 方式的完整提交流程
   * @param {Object} formData - 表單資料
   * @param {string} fileSelector - 檔案 input 選擇器
   * @param {string} action - 動作類型
   * @returns {Promise} 提交結果
   */


  // 查詢函數 (保留原有功能)
  const queryData = useCallback(
    async (queryParams = {}, actions = "find") => {
      setLoading(true);
      setError(null);

      try {
        // 建立查詢參數
        const params = new URLSearchParams();

        // 加入 action 參數
        params.append("action", actions);

        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });

        const url = `${baseUrl}?${params.toString()}`;
        const response = await axios.get(url);
        const result = response.data;

        if (result.status === "200") {
          setData(result.data);
          setStatus(result.status);
        } else {
          setData([]);
          setStatus(result.status);
        }

        return result;
      } catch (err) {
        setError(err);
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  const cleanToinit = useCallback(() => {
    setData(null);
    setError(null);
    setStatus("");
  }, []);

  return {
    data,
    loading,
    error,
    status,
    cleanToinit,

    refetch, // 主要提交函數
   
    readFileAsBase64, // 單個檔案轉 Base64
    processAntdUploadFiles, // 處理 Antd Upload 檔案轉 Base64
    submitFormWithBase64Files, // Base64 方式提交
    // 查詢功能
    queryData, // 查詢函數
  };
};

export default useGoogleSheetQuery;