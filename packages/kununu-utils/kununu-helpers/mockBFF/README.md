# Mock BFF

This is util that makes it easy for kununu FE applications to host a bff mock server. There are two named commands, `kununuCreateMockBFF` and `kununuServeMockBFF` that can be used to prepare data for a mock server and then start a mock server.

## kununuCreateMockBFF

This command fetches data from a live api (by default `https://www.kununu.com`) and puts the results into dedicated json files into a directory that can be commited. The config for which routes will be fetched, needs to be put into a dir that is also supplied to this command line via `kununuCreateMockBFF --dir=PATH_TO_DIR`. By default this config should be named `routes.json`

### accepted args
```
dir: path to physical directory that contains config and where json files will be saved
config?: name of config file, default=routes.json
apiUrl?: default=https://www.kununu.com
```

## kununuServeMockBFF

This serves a mock server. The mock server will respond for each url configured in the routes config file and serves data from the data dir. Easiest is to auto generate the json files via the `kununuCreateMockBFF` command. This script has one required argument, `--dir` that specifies the location of the routes config and the data to serve.

### accepted args
```
dir: path to physical directory that contains config and where json files will be saved
config?: name of config file, default=routes.json
apiUrl?: default=https://www.kununu.com
```