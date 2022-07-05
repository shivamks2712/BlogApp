"use strict";

var express = require('express');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var router = express.Router();

var Blog = require('../Models/Blog');

var User = require('../Models/User');

var multer = require('multer');

var mongoose = require('mongoose');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (imageMimeType.includes(file.mimetype)) {
    cb(null, true);
  } else cb(null, true);
};

var upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
});
var imageMimeType = ['image/jpeg', 'image/png', 'image/gif'];
router.post('/create', [check('title', 'Title is required').not().isEmpty(), check('description', 'Description is required').not().isEmpty(), upload.single('image')], function _callee(req, res) {
  var errors, obj, newBlog;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('requested');
          errors = validationResult(req.body);

          if (errors.isEmpty()) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).send(errors.array()));

        case 4:
          obj = JSON.parse(JSON.stringify(req.body));
          newBlog = Blog({
            title: obj.title,
            description: obj.description,
            tag: obj.tag,
            user: obj.user
          });

          try {
            newBlog.image = req.file.path;
            console.log(req.file);
          } catch (ex) {}

          newBlog.save(function (err, saved) {
            if (err) {
              return res.status(500).send('Server Error');
            } else return res.status(200).send(saved);
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); //                                                           get by tag

router.get('/byTag', function _callee2(req, res) {
  var blog, _blogs, _blogs2, blogs;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.query.type == 'id')) {
            _context2.next = 16;
            break;
          }

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Blog.findById(req.query.id).populate('user', ['name', 'avatar']));

        case 4:
          blog = _context2.sent;

          if (!blog) {
            _context2.next = 11;
            break;
          }

          _blogs = [];

          _blogs.push(blog);

          return _context2.abrupt("return", res.status(200).send(_blogs));

        case 11:
          return _context2.abrupt("return", res.status(400).send('NO blogs find'));

        case 12:
          _context2.next = 16;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);

        case 16:
          if (!(req.query.type == 'any')) {
            _context2.next = 25;
            break;
          }

          _context2.next = 19;
          return regeneratorRuntime.awrap(Blog.find().populate('user', ['name', 'avatar']));

        case 19:
          _blogs2 = _context2.sent;

          if (!_blogs2) {
            _context2.next = 24;
            break;
          }

          return _context2.abrupt("return", res.status(200).send(_blogs2));

        case 24:
          return _context2.abrupt("return", res.status(404).send('NO blogs find'));

        case 25:
          _context2.next = 27;
          return regeneratorRuntime.awrap(Blog.find({
            tag: req.query.tag
          }).populate('user', ['name', 'avatar']));

        case 27:
          blogs = _context2.sent;

          if (!blogs) {
            _context2.next = 32;
            break;
          }

          return _context2.abrupt("return", res.status(200).send(blogs));

        case 32:
          return _context2.abrupt("return", res.status(404).send('NO blogs find'));

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.get('/getMy', function _callee3(req, res) {
  var id, myBlogs;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = mongoose.Types.ObjectId(req.query.id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(Blog.find({
            user: id
          }));

        case 4:
          myBlogs = _context3.sent;
          if (myBlogs) res.status(200).send(myBlogs);else {
            res.status(400).send('No blog found');
          }
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send();

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router["delete"]('/deletePost', function _callee4(req, res) {
  var b;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Blog.findByIdAndDelete(req.query.id));

        case 2:
          b = _context4.sent;

          if (b) {
            res.status(200).send('Deleted');
          } else {
            console.log(b);
            res.status(500).send('Server Error ');
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;