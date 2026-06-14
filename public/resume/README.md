# Résumé

Place your résumé PDF here named exactly:

```
AgrimSangotra_Resume.pdf
```

The "Download Résumé" buttons and `GET /api/resume` serve this file.
Until it exists, the download endpoint returns a friendly 404.
(To change the expected filename, edit `RESUME_PATH` in `app/api/resume/route.ts`.)
