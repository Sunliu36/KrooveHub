import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";

export function WhereToDance() {
  const cities = [
    "台北市",
    "台中市",
    "高雄市",
    "台南市",
    "新竹市",
    "桃園市",
    "基隆市",
    "嘉義市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "台東縣",
    "苗栗縣",
    "南投縣",
    "彰化縣",
    "雲林縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex ">
        <h1 className="text-3xl font-bold mb-2">
          Where <br /> to Dance
        </h1>
        <p className="text-center">
          Choose the place that suits you best and start dancing today.
        </p>
        <div className="flex items-center justify-center w-full mt-3 mb-3 gap-2">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormGroup>
                {cities
                  .slice(0, cities.length / 2 + (cities.length % 2))
                  .map((city) => (
                    <FormControlLabel
                      key={city}
                      control={<Checkbox sx={{ color: "white" }} />}
                      label={city}
                    />
                  ))}
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                {cities
                  .slice(cities.length / 2 + (cities.length % 2))
                  .map((city) => (
                    <FormControlLabel
                      key={city}
                      control={<Checkbox sx={{ color: "white" }} />}
                      label={city}
                    />
                  ))}
              </FormGroup>
            </Grid>
          </Grid>
        </div>

        <div className="flex items-center justify-center w-full gap-2">
          <Button variant="contained" color="primary" href="/signup">
            送出
          </Button>
          <Button variant="contained" color="primary" href="/">
            取消
          </Button>
        </div>
      </div>
    </main>
  );
}

export default WhereToDance;
