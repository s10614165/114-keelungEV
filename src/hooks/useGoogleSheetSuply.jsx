import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const GAS_BASE_URL =
  "https://script.google.com/macros/s/AKfycbzhg9ErAXhMEYDql786fsHnM1UkIOfOYtwdipiOn8Ueu2Afuq0X3aWTTQNdL8yM9yQh_Q/exec";

const useGoogleSheetQuery = (baseUrl = GAS_BASE_URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  // 上傳單個檔案到 Google Drive
  const uploadFile = useCallback(
    async (file, fileName, fileType) => {
      try {
        const formData = new FormData();
        formData.append("action", "uploadFile");
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("fileType", fileType); // 'companyRegistration' 或 'businessRegistration'

        console.log(`正在上傳 ${fileType} 檔案:`, fileName);

        const response = await axios.post(baseUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === "200") {
          console.log(`${fileType} 檔案上傳成功:`, response.data.fileUrl);
          return response.data.fileUrl;
        } else {
          throw new Error(`檔案上傳失敗: ${response.data.message}`);
        }
      } catch (err) {
        console.error(`上傳 ${fileType} 檔案錯誤:`, err);
        throw err;
      }
    },
    [baseUrl]
  );

  // 批量處理檔案上傳
  const uploadFiles = useCallback(
    async (files) => {
      const fileUrls = {};

      // 處理 companyRegistration
      if (files.companyRegistration?.[0]?.originFileObj) {
        try {
          const file = files.companyRegistration[0].originFileObj;
          const fileName = `公司登記證明檔案_${Date.now()}_${file.name}`;
          const fileUrl = await uploadFile(
            file,
            fileName,
            "companyRegistration"
          );
          fileUrls.companyRegistration = fileUrl;
        } catch (error) {
          console.error("companyRegistration 上傳失敗:", error);
          throw new Error("公司登記證明檔案上傳失敗");
        }
      }

      // 處理 businessRegistration
      if (files.businessRegistration?.[0]?.originFileObj) {
        try {
          const file = files.businessRegistration[0].originFileObj;
          const fileName = `稅額申報書檔案_${Date.now()}_${file.name}`;
          const fileUrl = await uploadFile(
            file,
            fileName,
            "businessRegistration"
          );
          fileUrls.businessRegistration = fileUrl;
        } catch (error) {
          console.error("businessRegistration 上傳失敗:", error);
          throw new Error("稅額申報書檔案上傳失敗");
        }
      }

      return fileUrls;
    },
    [uploadFile]
  );

  // 提交表單資料到 Google Sheets
  const submitFormData = useCallback(
    async (formData, action = "getSubsidy") => {
      try {
        console.log("正在提交表單資料到 Google Sheets...");

        const response = await axios.post(
          baseUrl,
          {
            action: action,
            ...formData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = response.data;

        if (result.status === "200") {
          setData(result.data);
          setStatus(result.status);
          console.log("表單資料提交成功:", result);
        } else {
          setData([]);
          setStatus(result.status);
          console.warn("表單資料提交警告:", result);
        }

        return result;
      } catch (err) {
        console.error("提交表單資料錯誤:", err);
        setError(err);
        setData(null);
        throw err;
      }
    },
    [baseUrl]
  );

  // 主要的 refetch 函數 (完整流程)
  const refetch = useCallback(
    async (queryParams = {}, actions = "getSubsidy") => {
      setLoading(true);
      setError(null);

      try {
        console.log("開始提交流程...");

        // 分離檔案和一般資料
        const files = {};
        const formData = {};

        Object.entries(queryParams).forEach(([key, value]) => {
          if (key === "companyRegistration" || key === "businessRegistration") {
            if (value?.[0]?.originFileObj) {
              files[key] = value;
            }
          } else {
            formData[key] = value;
          }
        });

        // 步驟 1: 上傳檔案到 Google Drive
        let fileUrls = {};
        if (Object.keys(files).length > 0) {
          console.log("開始上傳檔案，檔案數量:", Object.keys(files).length);
          fileUrls = await uploadFiles(files);
          console.log("所有檔案上傳完成:", fileUrls);
        }

        // 步驟 2: 將檔案連結加入表單資料
        const finalFormData = {
          ...formData,
          ...fileUrls, // 檔案連結會被加入到對應的欄位中
          suplyDate: new Date().toISOString(),
        };

        console.log("準備提交的最終資料:", finalFormData);

        // 步驟 3: 提交完整的表單資料到 Google Sheets
        const result = await submitFormData(finalFormData, actions);
        console.log("完整流程提交完成:", result);

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
    [uploadFiles, submitFormData]
  );

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
    refetch, // 主要提交函數（包含檔案上傳）
    queryData, // 查詢函數
    status,
    cleanToinit,
    uploadFile,
    uploadFiles,
    submitFormData,
  };
};

export default useGoogleSheetQuery;
