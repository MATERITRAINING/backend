const express = require("express");
const {
  register,
  login,
  googleLogin,
  refreshToken,
  profile,
} = require("../controllers/AuthControllers");

const router = express.Router();
const validationResultMiddleware = require("../middleware/validatioResultMiddleware");
const userValidator = require("../validators/userValidator");
const jwtValidateMiddleware = require("../middleware/JwtValidateMiddleware");
const paginationMiddleware = require("../middleware/paginationMiddleware");
const uploadMulti = require("../storage/fileUploadMulti");
const uploadSingle = require("../storage/fileUploadSingle");

const {
  createProduct,
  createBulkProduct,
  deleteBulkProduct,
  listProduct,
  detailProduct,
  updateProduct,
} = require("../controllers/ProductControllers");

//auth

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/refresh-token", refreshToken);

router.use(jwtValidateMiddleware);

router.get("/profile", profile)
router.post("/product/create", createProduct);
router.post("/product/create-bulk", createBulkProduct);
router.post("/product/delete-bulk", deleteBulkProduct);
router.get("/product/list", listProduct);
router.get("/product/:id/detail", detailProduct);
router.put("/product/:id/update", updateProduct);

//upload

router.post("/upload/single", uploadSingle, (req, res) => {
  return res.json({
    status: "Success",
    msg: "Upload Success",
    data: {
      file: req.file,
      filename: req.file.filename,
      fileUrl: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
    },
  });
});
// router.post("/kelas/create", createKelas)
// router.post("/kelas/create-bulk", createKelasBulk)
// router.put("/kelas/update/:id", updateKelas)
// router.get("/kelas/detail/:id", detailKelas)
// router.get("/kelas/list", paginationMiddleware, listKelas)

module.exports = router;
